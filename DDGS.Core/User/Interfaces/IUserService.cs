using DDGS.Core.Identity.Payloads;
using FluentResults;

namespace DDGS.Core.User.Interfaces
{
    public interface IUserService
    {
        Task<Result<User>> RegisterAsync(UserRegisterPayload payload);

        Task<User?> GetAsync(Guid id);

        Task<List<User>> GetAllAsync();
    }
}
