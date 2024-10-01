using DDGS.Core.Identity.Models;
using FluentResults;
using Microsoft.AspNetCore.Identity;

namespace DDGS.Core.Identity.Interfaces
{
    public interface IIdentityRepository
    {
        Task<Result> RegisterUserAsync(UserEntity user);

        Task<Result> RegisterUserAsync(UserEntity user, string password);

        Task<UserEntity?> GetUserAsync(Guid id);

        Task<UserEntity?> GetUserByEmailAsync(string email);

        Task<List<UserEntity>> GetAllUsersAsync();

        Task<Result> AddUserExternalLoginAsync(UserEntity user, UserLoginInfo loginInfo);

        Task<List<UserLoginInfo>> GetUserLoginsAsync(UserEntity user);

        Task<bool> CheckUserPasswordAsync(UserEntity user, string userPassword);
    }
}
