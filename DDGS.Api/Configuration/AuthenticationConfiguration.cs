using Microsoft.IdentityModel.Protocols.Configuration;
using OpenIddict.Validation.AspNetCore;

namespace DDGS.Api.Configuration
{
    public static class AuthenticationConfiguration
    {
        public static IServiceCollection AddOpenIddictAuthentication(this IServiceCollection services)
        {
            services.AddOpenIddict()
                .AddValidation(opts =>
                {
                    if (Environment.GetEnvironmentVariable("AUTH_SERVER_URL") == null)
                    {
                        throw new InvalidConfigurationException();
                    }
                    opts.SetIssuer(Environment.GetEnvironmentVariable("AUTH_SERVER_URL")!);

                    if (Environment.GetEnvironmentVariable("AUTH_RESOURCE_SERVER_NAME") == null)
                    {
                        throw new InvalidConfigurationException();
                    }
                    opts.AddAudiences(Environment.GetEnvironmentVariable("AUTH_RESOURCE_SERVER_NAME")!);

                    if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == Environments.Development)
                    {
                        opts.UseSystemNetHttp()
                            .ConfigureHttpClientHandler(_ => _.ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true);
                    }
                    else
                    {
                        opts.UseSystemNetHttp();
                    }
                    opts.UseAspNetCore();
                });

            services.AddAuthentication(OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme);

            return services;
        }
    }
}
