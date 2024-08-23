using DDGS.Core.Identity.Entities;

namespace DDGS.Core.Identity.Interfaces
{
    public interface IUserContextService
    {
        Task<User> GetCurrentUserAsync();
    }
}
