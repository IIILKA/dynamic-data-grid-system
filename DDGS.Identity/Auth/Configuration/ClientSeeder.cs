using Microsoft.IdentityModel.Protocols.Configuration;
using OpenIddict.Abstractions;

namespace DDGS.Identity.Auth.Configuration
{
    public class ClientSeeder : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public ClientSeeder(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();

            await AddScopesAsync(scope, cancellationToken);

            await AddClientsAsync(scope, cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }

        private async ValueTask AddScopesAsync(IServiceScope scope, CancellationToken cancellationToken)
        {
            if (Environment.GetEnvironmentVariable("AUTH_RESOURCE_SERVER_NAME") == null)
            {
                throw new InvalidConfigurationException();
            }

            var scopeManager = scope.ServiceProvider.GetRequiredService<IOpenIddictScopeManager>();

            var scopeDescriptor = new OpenIddictScopeDescriptor
            {
                DisplayName = "DDGS API scope",
                Name = "ddgs.api",
                Resources =
                {
                    Environment.GetEnvironmentVariable("AUTH_RESOURCE_SERVER_NAME")!
                }
            };

            var scopeInstance = await scopeManager.FindByNameAsync(scopeDescriptor.Name, cancellationToken);

            if (scopeInstance == null)
            {
                await scopeManager.CreateAsync(scopeDescriptor, cancellationToken);
            }
            else
            {
                await scopeManager.UpdateAsync(scopeInstance, scopeDescriptor, cancellationToken);
            }
        }

        private async ValueTask AddClientsAsync(IServiceScope scope, CancellationToken cancellationToken)
        {
            var spaClientSecret = Environment.GetEnvironmentVariable("AUTH_SPA_CLIENT_SECRET");
            var spaClientId = Environment.GetEnvironmentVariable("AUTH_SPA_CLIENT_ID");
            var spaClientUrl = Environment.GetEnvironmentVariable("CLIENT_URL");

            if (spaClientSecret == null || spaClientId == null || spaClientUrl == null)
            {
                throw new InvalidConfigurationException();
            }

            var appManager = scope.ServiceProvider.GetRequiredService<IOpenIddictApplicationManager>();

            var appDescriptor = new OpenIddictApplicationDescriptor
            {
                ClientId = spaClientId,
                ClientSecret = spaClientSecret,
                ConsentType = OpenIddictConstants.ConsentTypes.Implicit,
                DisplayName = "SPA client",
                ClientType = OpenIddictConstants.ClientTypes.Confidential,
                RedirectUris =
                {
                    new Uri($"{spaClientUrl}/oauth/callback")
                },
                PostLogoutRedirectUris =
                {
                    new Uri($"{spaClientUrl}/login"),
                    new Uri($"{spaClientUrl}/unauthorized")
                },
                Permissions =
                {
                    OpenIddictConstants.Permissions.Endpoints.Authorization,
                    OpenIddictConstants.Permissions.Endpoints.Logout,
                    OpenIddictConstants.Permissions.Endpoints.Token,
                    OpenIddictConstants.Permissions.GrantTypes.AuthorizationCode,
                    OpenIddictConstants.Permissions.GrantTypes.RefreshToken,
                    OpenIddictConstants.Permissions.ResponseTypes.Code,
                    OpenIddictConstants.Permissions.Scopes.Email,
                    OpenIddictConstants.Permissions.Scopes.Profile,
                    $"{OpenIddictConstants.Permissions.Prefixes.Scope}ddgs.api"
                },
                Requirements =
                {
                    OpenIddictConstants.Requirements.Features.ProofKeyForCodeExchange
                }
            };


            var client = await appManager.FindByClientIdAsync(appDescriptor.ClientId, cancellationToken);

            if (client == null)
            {
                await appManager.CreateAsync(appDescriptor, cancellationToken);
            }
            else
            {
                await appManager.UpdateAsync(client, appDescriptor, cancellationToken);
            }
        }
    }
}
