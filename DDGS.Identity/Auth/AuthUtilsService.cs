using OpenIddict.Abstractions;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace DDGS.Identity.Auth
{
    public class AuthUtilsService
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

        public static List<string> GetDestinations(ClaimsIdentity identity, Claim claim)
        {
            var destinations = new List<string>();

            if (claim.Type is OpenIddictConstants.Claims.Name or OpenIddictConstants.Claims.Email)
            {
                destinations.Add(OpenIddictConstants.Destinations.AccessToken);
            }

            return destinations;
        }
    }
}
