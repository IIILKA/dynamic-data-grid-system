using DDGS.Core.Identity.Interfaces;
using DDGS.Core.Identity.Models;

namespace DDGS.Api.Cotext
{
    public class UserContextService : IUserContextService
    {
        private readonly IIdentityService _identityService;

        public UserContextService(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<UserEntity> GetCurrentUserAsync()
        {
            return (await _identityService.GetByEmailAsync("verbiloyegor@gmail.com"))!;
        }
    }
}
