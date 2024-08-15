using Microsoft.AspNetCore.Authentication;
using OpenIddict.Abstractions;

namespace DDGS.Identity.Auth.Interfaces
{
    public interface IAuthUtilsService
    {
        bool IsAuthenticated(AuthenticateResult authenticateResult, OpenIddictRequest request);
    }
}
