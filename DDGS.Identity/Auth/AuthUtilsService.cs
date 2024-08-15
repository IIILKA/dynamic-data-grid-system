using DDGS.Identity.Auth.Interfaces;
using OpenIddict.Abstractions;
using Microsoft.AspNetCore.Authentication;

namespace DDGS.Identity.Auth
{
    public class AuthUtilsService : IAuthUtilsService
    {
        public bool IsAuthenticated(AuthenticateResult authenticateResult, OpenIddictRequest request)
        {
            if (!authenticateResult.Succeeded)
            {
                return false;
            }

            if (request.MaxAge.HasValue && authenticateResult.Properties != null)
            {
                var maxAgeSeconds = TimeSpan.FromSeconds(request.MaxAge.Value);

                var expired = !authenticateResult.Properties.IssuedUtc.HasValue ||
                              DateTimeOffset.UtcNow - authenticateResult.Properties.IssuedUtc > maxAgeSeconds;
                if (expired)
                {
                    return false;
                }
            }

            return true;
        }
    }
}
