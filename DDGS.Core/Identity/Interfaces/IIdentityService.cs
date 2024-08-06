using DDGS.Core.Identity.Entities;
using DDGS.Core.Identity.Payloads;
using FluentResults;

namespace DDGS.Core.Identity.Interfaces
{
    public interface IIdentityService
    {
        Task<Result<User>> RegisterAsync(UserRegisterPayload payload);

        Task<Result<User>> RegisterAsync(UserRegisterPayload payload, string userPassword);

        Task<User?> GetAsync(Guid id);

        Task<User?> GetByEmailAsync(string email);

        Task<List<User>> GetAllAsync();

        Task<Result> AddExternalLoginAsync(User user, UserAddExternalLoginPayload payload);

        Task<bool> DoesExternalLoginRegisteredAsync(
            User user,
            string externalLoginProviderName,
            string externalLoginProviderUserId);

        Task<bool> CheckUserPasswordAsync(User user, string userPassword);
    }
}
