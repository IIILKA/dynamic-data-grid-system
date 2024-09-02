using DDGS.Core.Identity.Interfaces;
using DDGS.Core.Identity.Models;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure.Identity
{
    public class IdentityRepository : IIdentityRepository
    {
        private readonly UserManager<UserEntity> _userManager;

        public IdentityRepository(UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Result> RegisterUserAsync(UserEntity user)
        {
            return ConvertIdentityResult(await _userManager.CreateAsync(user));
        }

        public async Task<Result> RegisterUserAsync(UserEntity user, string password)
        {
            return ConvertIdentityResult(await _userManager.CreateAsync(user, password));
        }

        public async Task<UserEntity?> GetUserAsync(Guid id)
        {
            return await _userManager.Users.FirstOrDefaultAsync(_ => _.Id == id);
        }

        public async Task<UserEntity?> GetUserByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<List<UserEntity>> GetAllUsersAsync()
        {
            return await _userManager.Users.ToListAsync();
        }

        public async Task<Result> AddUserExternalLoginAsync(UserEntity user, UserLoginInfo loginInfo)
        {
            return ConvertIdentityResult(await _userManager.AddLoginAsync(user, loginInfo));
        }

        public async Task<List<UserLoginInfo>> GetUserLoginsAsync(UserEntity user)
        {
            var userLogins = await _userManager.GetLoginsAsync(user);
            return userLogins.ToList();
        }

        public async Task<bool> CheckUserPasswordAsync(UserEntity user, string userPassword)
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
