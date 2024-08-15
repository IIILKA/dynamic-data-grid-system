using System.Security.Claims;
using DDGS.Core.Identity.Entities.Payloads;
using DDGS.Core.Identity.Interfaces;
using DDGS.Identity.Auth.Dto;
using DDGS.Identity.Core;
using FluentResults;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using OpenIddict.Client.WebIntegration;
using OpenIddict.Server.AspNetCore;

namespace DDGS.Identity.Auth
{
    public class AuthorizationController : Controller
    {
        private readonly IIdentityService _identityService;
        private readonly IOpenIddictScopeManager _scopeManager;
        private readonly AuthUtilsService _authService;

        public AuthorizationController(
            IIdentityService identityService,
            IOpenIddictScopeManager scopeManager,
            AuthUtilsService authService)
        {
            _identityService = identityService;
            _scopeManager = scopeManager;
            _authService = authService;
        }

        [HttpPost("~/authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] UserAuthenticateRequestDto authDto)
        {
            var user = await _identityService.GetByEmailAsync(authDto.Email);

            if (user == null)
            {
                return BadRequest(new ErrorResponseDto($"User with email {authDto.Email} is not exist"));
            }

            if (!await _identityService.CheckUserPasswordAsync(user, authDto.Password))
            {
                return BadRequest(new ErrorResponseDto("Invalid password"));
            }

            var claims = new List<Claim>()
            {
                new(OpenIddictConstants.Claims.Subject, user.Id.ToString()),
                new(OpenIddictConstants.Claims.Name, user.UserName!),
                new(OpenIddictConstants.Claims.Email, user.Email!)
            };

            var identity = new ClaimsIdentity(
                claims,
                CookieAuthenticationDefaults.AuthenticationScheme,
                OpenIddictConstants.Claims.Name,
                OpenIddictConstants.Claims.Role);

            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(14)
            };

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity), authProperties);

            return Ok();
        }

        [HttpGet("~/authorize")]
        [HttpPost("~/authorize")]
        public async Task<IActionResult> Authorize()
        {
            var request = HttpContext.GetOpenIddictServerRequest() ??
                            throw new InvalidOperationException("The OpenID Connect request cannot be retrieved.");

            var result = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (!_authService.IsAuthenticated(result, request))
            {
                return Challenge(new[] { CookieAuthenticationDefaults.AuthenticationScheme });
            }

            var identity = new ClaimsIdentity(
                result.Principal!.Claims,
                TokenValidationParameters.DefaultAuthenticationType,
                OpenIddictConstants.Claims.Name,
                OpenIddictConstants.Claims.Role);

            identity.SetScopes(request.GetScopes());
            identity.SetResources(await _scopeManager.ListResourcesAsync(identity.GetScopes()).ToListAsync());

            identity.SetDestinations(c => AuthUtilsService.GetDestinations(identity, c));

            return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        [HttpPost("~/token")]
        public async Task<IActionResult> Exchange()
        {
            var request = HttpContext.GetOpenIddictServerRequest() ??
                          throw new InvalidOperationException("The OpenID Connect request cannot be retrieved.");

            if (!request.IsAuthorizationCodeGrantType() && !request.IsRefreshTokenGrantType())
                throw new InvalidOperationException("The specified grant type is not supported.");

            var result = await HttpContext.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

            var userId = result.Principal!.GetClaim(OpenIddictConstants.Claims.Subject);

            if (string.IsNullOrEmpty(userId))
            {
                return Forbid(
                    authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                    properties: new AuthenticationProperties(new Dictionary<string, string>
                    {
                        [OpenIddictServerAspNetCoreConstants.Properties.Error] = OpenIddictConstants.Errors.InvalidGrant,
                        [OpenIddictServerAspNetCoreConstants.Properties.ErrorDescription] =
                            "Cannot find user from the token."
                    }!));
            }

            var identity = new ClaimsIdentity(
                result.Principal!.Claims,
                TokenValidationParameters.DefaultAuthenticationType,
                OpenIddictConstants.Claims.Name,
                OpenIddictConstants.Claims.Role);

            identity.SetDestinations(c => AuthUtilsService.GetDestinations(identity, c));

            return SignIn(new ClaimsPrincipal(identity), OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);
        }

        [HttpGet("~/logout")]
        [HttpPost("~/logout")]
        public async Task<IActionResult> LogoutPost()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return SignOut(
                authenticationSchemes: OpenIddictServerAspNetCoreDefaults.AuthenticationScheme,
                properties: new AuthenticationProperties
                {
                    RedirectUri = "/user/login"
                });
        }

        [HttpGet("~/challenge/google")]
        public IActionResult ChallengeGoogle()
        {
            var properties = new AuthenticationProperties
            {
                Parameters = { { "prompt", "select_account" } }
            };
            return Challenge(properties, new[] { OpenIddictClientWebIntegrationConstants.Providers.Google });
        }

        [HttpGet("~/callback/login/google")]
        [HttpPost("~/callback/login/google")]
        public async Task<IActionResult> HandleGoogleLoginCallbackAsync()
        {
            var result = await HttpContext.AuthenticateAsync(OpenIddictClientWebIntegrationConstants.Providers.Google);

            var identity = new ClaimsIdentity(
                "ExternalLogin",
                OpenIddictConstants.Claims.Name,
                OpenIddictConstants.Claims.Role);

            var email = result.Principal!.GetClaim(OpenIddictConstants.Claims.Email)!;
            var username = result.Principal!.GetClaim(OpenIddictConstants.Claims.Name)!;
            var externalLoginUserId = result.Principal!.GetClaim(OpenIddictConstants.Claims.Subject)!;
            var externalLoginProviderName = result.Principal!.GetClaim(OpenIddictConstants.Claims.Private.ProviderName)!;

            var ensureUserRegisteredResult = await EnsureUserRegisteredAsync(email, username);
            if (ensureUserRegisteredResult.IsFailed)
            {
                //TODO: redirect to SPA
                return BadRequest(new ErrorResponseDto(ensureUserRegisteredResult.Errors.Select(_ => _.Message).ToArray()));
            }
            var user = ensureUserRegisteredResult.Value;

            var ensureUserExternalLoginRegisteredResult =
                await EnsureUserExternalLoginRegisteredAsync(user, externalLoginProviderName, externalLoginUserId);
            if (ensureUserExternalLoginRegisteredResult.IsFailed)
            {
                //TODO: redirect to SPA
                return BadRequest(new ErrorResponseDto(ensureUserExternalLoginRegisteredResult.Errors.Select(_ => _.Message).ToArray()));
            }

            identity.SetClaim(OpenIddictConstants.Claims.Subject, user.Id.ToString())
                .SetClaim(OpenIddictConstants.Claims.Name, user.UserName)
                .SetClaim(OpenIddictConstants.Claims.Email, email);

            identity.SetClaim(OpenIddictConstants.Claims.Private.RegistrationId, result.Principal!.GetClaim(OpenIddictConstants.Claims.Private.RegistrationId))
                .SetClaim(OpenIddictConstants.Claims.Private.ProviderName, externalLoginProviderName);

            var properties = new AuthenticationProperties(result.Properties!.Items)
            {
                RedirectUri = result.Properties.RedirectUri ?? $"{Environment.GetEnvironmentVariable("CLIENT_URL")}/oauth/external/callback"
            };

            return SignIn(new ClaimsPrincipal(identity), properties, CookieAuthenticationDefaults.AuthenticationScheme);
        }

        private async Task<Result<DDGS.Core.Identity.Entities.User>> EnsureUserRegisteredAsync(string email, string username)
        {
            var user = await _identityService.GetByEmailAsync(email);
            if (user != null)
            {
                return user;
            }

            var registrationResult = await _identityService.RegisterAsync(new UserRegisterPayload(username, email));

            if (registrationResult.IsFailed)
            {
                return Result.Fail(registrationResult.Errors.Select(_ => _.Message));
            }

            user = registrationResult.Value;

            return user;
        }

        private async Task<Result> EnsureUserExternalLoginRegisteredAsync(DDGS.Core.Identity.Entities.User user, string externalLoginProviderName, string externalLoginUserId)
        {
            if (await _identityService.DoesExternalLoginRegisteredAsync(user, externalLoginProviderName, externalLoginUserId))
            {
                return Result.Ok();
            }

            var addExternalLoginResult = await _identityService.AddExternalLoginAsync(
                user,
                new UserAddExternalLoginPayload(
                    externalLoginProviderName,
                    externalLoginUserId,
                    externalLoginProviderName));

            return addExternalLoginResult.IsFailed ? Result.Fail(addExternalLoginResult.Errors.Select(_ => _.Message)) : Result.Ok();
        }
    }
}
