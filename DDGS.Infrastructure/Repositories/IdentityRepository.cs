using DDGS.Core.Identity.Entities;
using DDGS.Core.Identity.Interfaces;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure.Repositories
{
    public class IdentityRepository : IIdentityRepository
    {
        private readonly UserManager<User> _userManager;

        public IdentityRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Result> RegisterUserAsync(User user)
        {
            return ConvertIdentityResult(await _userManager.CreateAsync(user));
        }

        public async Task<Result> RegisterUserAsync(User user, string password)
        {
            return ConvertIdentityResult(await _userManager.CreateAsync(user, password));
        }

        public async Task<User?> GetUserAsync(Guid id)
        {
            return await _userManager.Users.FirstOrDefaultAsync(_ => _.Id == id);
        }

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _userManager.Users.ToListAsync();
        }

        public async Task<Result> AddUserExternalLoginAsync(User user, UserLoginInfo loginInfo)
        {
            return ConvertIdentityResult(await _userManager.AddLoginAsync(user, loginInfo));
        }

        public async Task<List<UserLoginInfo>> GetUserLoginsAsync(User user)
        {
            var userLogins = await _userManager.GetLoginsAsync(user);
            return userLogins.ToList();
        }

        public async Task<bool> CheckUserPasswordAsync(User user, string userPassword)
        {
            return await _userManager.CheckPasswordAsync(user, userPassword);
        }

        private Result ConvertIdentityResult(IdentityResult identityResult)
        {
            if (!identityResult.Succeeded)
            {
                return Result.Fail(identityResult.Errors.Select(_ => _.Description));
            }

            return Result.Ok();
        }
    }
}
