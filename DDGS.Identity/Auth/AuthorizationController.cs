using System.Collections.Immutable;
using System.Security.Claims;
using DDGS.Identity.Auth.Dto;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using OpenIddict.Abstractions;
using OpenIddict.Server.AspNetCore;

namespace DDGS.Identity.Auth
{
    public class AuthorizationController : Controller
    {
        private readonly IOpenIddictScopeManager _scopeManager;
        private readonly AuthUtilsService _authService;

        private readonly UserManager<Core.User.User> _userManager;
        private readonly SignInManager<Core.User.User> _signInManager;

        public AuthorizationController(
            IOpenIddictScopeManager scopeManager,
            AuthUtilsService authService,
            UserManager<Core.User.User> userManager,
            SignInManager<Core.User.User> signInManager)
        {
            _scopeManager = scopeManager;
            _authService = authService;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("~/authenticate")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] UserAuthenticateRequestDto authDto)
        {
            var user = await _userManager.FindByEmailAsync(authDto.Email);

            if (user == null)
            {
                return BadRequest($"User with email {authDto.Email} is not exist");
            }

            var checkPasswordResult = await _signInManager.CheckPasswordSignInAsync(user, authDto.Password, false);

            if (!checkPasswordResult.Succeeded)
            {
                return BadRequest("Invalid password");
            }

            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new(ClaimTypes.Name, user.UserName!),
                new(ClaimTypes.Email, authDto.Email),
            };

            var principal = new ClaimsPrincipal(
                new List<ClaimsIdentity>
                {
                    new(claims, CookieAuthenticationDefaults.AuthenticationScheme)
                });

            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(14)
            };

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal, authProperties);

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

            var userId = result.Principal.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var username = result.Principal.FindFirst(ClaimTypes.Name)!.Value;
            var email = result.Principal.FindFirst(ClaimTypes.Email)!.Value;
            
            var identity = new ClaimsIdentity(
                authenticationType: TokenValidationParameters.DefaultAuthenticationType,
                nameType: OpenIddictConstants.Claims.Name,
                roleType: OpenIddictConstants.Claims.Role);

            identity.SetClaim(OpenIddictConstants.Claims.Subject, userId)
                .SetClaim(OpenIddictConstants.Claims.Email, email)
                .SetClaim(OpenIddictConstants.Claims.Name, username)
                .SetClaims(OpenIddictConstants.Claims.Role, new List<string> { "user", "admin" }.ToImmutableArray());

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

            var result =
                await HttpContext.AuthenticateAsync(OpenIddictServerAspNetCoreDefaults.AuthenticationScheme);

            var userId = result.Principal.GetClaim(OpenIddictConstants.Claims.Subject);
            var username = result.Principal.GetClaim(OpenIddictConstants.Claims.Name);
            var email = result.Principal.GetClaim(OpenIddictConstants.Claims.Email);

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

            var identity = new ClaimsIdentity(result.Principal.Claims,
                authenticationType: TokenValidationParameters.DefaultAuthenticationType,
                nameType: OpenIddictConstants.Claims.Name,
                roleType: OpenIddictConstants.Claims.Role);

            identity.SetClaim(OpenIddictConstants.Claims.Subject, userId)
                .SetClaim(OpenIddictConstants.Claims.Email, email)
                .SetClaim(OpenIddictConstants.Claims.Name, username)
                .SetClaims(OpenIddictConstants.Claims.Role, new List<string> { "user", "admin" }.ToImmutableArray());

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
    }
}
