using DDGS.Core.Identity.Models;

namespace DDGS.Core.Identity.Interfaces
{
    public interface IUserContextService
    {
        Task<UserEntity> GetCurrentUserAsync();
    }
}
