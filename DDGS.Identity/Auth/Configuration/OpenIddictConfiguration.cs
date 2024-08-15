using DDGS.Identity.Auth.Interfaces;
using DDGS.Identity.Utils;
using DDGS.Infrastructure;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.IdentityModel.Protocols.Configuration;
using OpenIddict.Abstractions;

namespace DDGS.Identity.Auth.Configuration
{
    public static class OpenIddictConfiguration
    {
        public static IServiceCollection AddDdgsOpenIddict(this IServiceCollection services)
        {
            services.AddOpenIddict()
                .AddCore(opts =>
                {
                    opts.UseEntityFrameworkCore().UseDbContext<DdgsPostgresDbContext>();
                })
                .AddServer(opts =>
                {
                    opts.SetAuthorizationEndpointUris("authorize")
                        .SetLogoutEndpointUris("logout")
                        .SetTokenEndpointUris("token");

                    opts.RegisterScopes(OpenIddictConstants.Scopes.Email, OpenIddictConstants.Scopes.Profile);

                    opts.AllowAuthorizationCodeFlow()
                        .RequireProofKeyForCodeExchange();
                    opts.AllowRefreshTokenFlow();

                    if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Environments.Development)
                    {
                        opts.AddDevelopmentEncryptionCertificate()
                            .AddDevelopmentSigningCertificate();
                    }
                    else
                    {
                        //TODO: Configure
                    }

                    opts.SetAccessTokenLifetime(TimeSpan.FromHours(4))
                        .SetRefreshTokenLifetime(TimeSpan.FromDays(2));

                    if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Environments.Development)
                    {
                        opts.DisableAccessTokenEncryption();
                    }
                    else
                    {
                        //TODO: Configure
                    }

                    opts.UseAspNetCore()
                        .EnableAuthorizationEndpointPassthrough()
                        .EnableLogoutEndpointPassthrough()
                        .EnableTokenEndpointPassthrough();
                })
                .AddClient(opts =>
                {
                    opts.AllowAuthorizationCodeFlow();
                    opts.AllowRefreshTokenFlow();

                    if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Environments.Development)
                    {
                        opts.AddDevelopmentEncryptionCertificate()
                            .AddDevelopmentSigningCertificate();
                    }
                    else
                    {
                        //TODO: Configure
                    }

                    opts.UseAspNetCore()
                        .EnableRedirectionEndpointPassthrough();

                    opts.UseWebProviders()
                        .AddGoogle(googleOpts =>
                        {
                            var googleClientId = Environment.GetEnvironmentVariable("AUTH_GOOGLE_CLIENT_ID");
                            var googleClientSecret = Environment.GetEnvironmentVariable("AUTH_GOOGLE_CLIENT_SECRET");

                            if (string.IsNullOrEmpty(googleClientSecret) || string.IsNullOrEmpty(googleClientId))
                            {
                                throw new InvalidConfigurationException("Auth Google variables are invalid");
                            }

                            googleOpts
                                .AddScopes(OpenIddictConstants.Scopes.Email)
                                .AddScopes(OpenIddictConstants.Scopes.Profile)
                                .SetClientId(googleClientId)
                                .SetClientSecret(googleClientSecret)
                                .SetRedirectUri("callback/login/google");
                        });

                });

            services.AddHostedService<ClientSeeder>();

            services.AddSingleton<IAuthUtilsService, AuthUtilsService>();

            var httpsEnabled = EnvironmentUtils.GetEnvironmentVariableAsBool("ASPNETCORE_HTTPS_ENABLED", false);

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.Cookie.IsEssential = true;
                    options.Cookie.HttpOnly = true;
                    options.ExpireTimeSpan = TimeSpan.FromDays(14);
                    options.SlidingExpiration = false;
                    options.Cookie.SameSite = SameSiteMode.Lax;
                    options.Cookie.SecurePolicy = httpsEnabled ? CookieSecurePolicy.Always : CookieSecurePolicy.None;
                    options.LoginPath = "/user/login";
                });

            return services;
        }
    }
}
