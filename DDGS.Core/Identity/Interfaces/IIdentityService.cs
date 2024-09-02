using DDGS.Core.Identity.Models;
using DDGS.Core.Identity.Models.Payloads;
using FluentResults;

namespace DDGS.Core.Identity.Interfaces
{
    public interface IIdentityService
    {
        Task<Result<UserEntity>> RegisterAsync(UserRegisterPayload payload);

        Task<Result<UserEntity>> RegisterAsync(UserRegisterPayload payload, string userPassword);

        Task<UserEntity?> GetAsync(Guid id);

        Task<UserEntity?> GetByEmailAsync(string email);

        Task<List<UserEntity>> GetAllAsync();

        Task<Result> AddExternalLoginAsync(UserEntity userEntity, UserAddExternalLoginPayload payload);

        Task<bool> DoesExternalLoginRegisteredAsync(
            UserEntity userEntity,
            string externalLoginProviderName,
            string externalLoginProviderUserId);

        Task<bool> CheckUserPasswordAsync(UserEntity userEntity, string userPassword);
    }
}
