using DDGS.Core.Identity.Entities;
using DDGS.Core.Identity.Interfaces;

namespace DDGS.Api.Cotext
{
    public class UserContextService : IUserContextService
    {
        private readonly IIdentityService _identityService;

        public UserContextService(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<User> GetCurrentUserAsync()
        {
            return (await _identityService.GetByEmailAsync("verbiloyegor@gmail.com"))!;
        }
    }
}
