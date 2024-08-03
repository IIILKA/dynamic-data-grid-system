using DDGS.Core.User;
using DDGS.Core.User.Interfaces;
using FluentResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<User> _userManager;

        public UserRepository(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Result> RegisterAsync(User entity, string password)
        {
            var result = await _userManager.CreateAsync(entity, password);

            if (!result.Succeeded)
            {
                return Result.Fail(result.Errors.Select(_ => _.Description));
            }

            return Result.Ok();
        }

        public async Task<User?> GetAsync(Guid id)
        {
            return await _userManager.Users.FirstOrDefaultAsync(_ => _.Id == id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _userManager.FindByEmailAsync(email);
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _userManager.Users.ToListAsync();
        }
    }
}
