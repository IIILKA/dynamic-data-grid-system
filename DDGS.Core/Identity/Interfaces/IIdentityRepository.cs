using DDGS.Core.Identity.Entities;
using FluentResults;
using Microsoft.AspNetCore.Identity;

namespace DDGS.Core.Identity.Interfaces
{
    public interface IIdentityRepository
    {
        Task<Result> RegisterUserAsync(User user);

        Task<Result> RegisterUserAsync(User user, string password);

        Task<User?> GetUserAsync(Guid id);

        Task<User?> GetUserByEmailAsync(string email);

        Task<List<User>> GetAllUsersAsync();

        Task<Result> AddUserExternalLoginAsync(User user, UserLoginInfo loginInfo);

        Task<List<UserLoginInfo>> GetUserLoginsAsync(User user);

        Task<bool> CheckUserPasswordAsync(User user, string userPassword);
    }
}
