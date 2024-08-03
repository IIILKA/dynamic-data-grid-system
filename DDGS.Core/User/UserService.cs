using DDGS.Core.Identity.Payloads;
using DDGS.Core.User.Interfaces;
using FluentResults;

namespace DDGS.Core.User
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;

        public UserService(IUserRepository repository)
        {
            _repository = repository;
        }

        public async Task<Result<User>> RegisterAsync(UserRegisterPayload payload)
        {
            //TODO: Use mapper
            var result = await _repository.RegisterAsync(new User { UserName = payload.Username, Email = payload.Email }, payload.Password);

            if (result.IsFailed)
            {
                return result;
            }

            var user = await _repository.GetByEmailAsync(payload.Email);

            return Result.Ok(user!);
        }

        public async Task<User?> GetAsync(Guid id)
        {
            return await _repository.GetAsync(id);
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }
    }
}
