using FluentResults;

namespace DDGS.Core.User.Interfaces
{
    public interface IUserRepository
    {
        Task<Result> RegisterAsync(User entity, string password);

        Task<User?> GetAsync(Guid id);

        Task<User?> GetByEmailAsync(string email);

        Task<List<User>> GetAllAsync();
    }
}
