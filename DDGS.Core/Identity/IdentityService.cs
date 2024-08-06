using DDGS.Core.Identity.Entities;
using DDGS.Core.Identity.Interfaces;
using DDGS.Core.Identity.Payloads;
using FluentResults;
using MapsterMapper;
using Microsoft.AspNetCore.Identity;

namespace DDGS.Core.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly IIdentityRepository _repository;
        private readonly IMapper _mapper;

        public IdentityService(IIdentityRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Result<User>> RegisterAsync(UserRegisterPayload payload, string userPassword)
        {
            var result = await _repository.RegisterUserAsync(_mapper.Map<User>(payload), userPassword);

            if (result.IsFailed)
            {
                return result;
            }

            var user = await _repository.GetUserByEmailAsync(payload.Email);

            return Result.Ok(user!);
        }

        public async Task<Result<User>> RegisterAsync(UserRegisterPayload payload)
        {
            var result = await _repository.RegisterUserAsync(_mapper.Map<User>(payload));

            if (result.IsFailed)
            {
                return result;
            }

            var user = await _repository.GetUserByEmailAsync(payload.Email);

            return Result.Ok(user!);
        }

        public async Task<User?> GetAsync(Guid id)
        {
            return await _repository.GetUserAsync(id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _repository.GetUserByEmailAsync(email);
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _repository.GetAllUsersAsync();
        }

        public async Task<Result> AddExternalLoginAsync(User user, UserAddExternalLoginPayload payload)
        {
            return await _repository.AddUserExternalLoginAsync(user, _mapper.Map<UserLoginInfo>(payload));
        }

        public async Task<bool> DoesExternalLoginRegisteredAsync(
            User user,
            string externalLoginProviderName,
            string externalLoginProviderUserId)
        {
            var userLogins = await _repository.GetUserLoginsAsync(user);

            var externalLogin = userLogins.FirstOrDefault(_ =>
                _.LoginProvider == externalLoginProviderName && _.ProviderKey == externalLoginProviderUserId);

            return externalLogin != null;
        }

        public async Task<bool> CheckUserPasswordAsync(User user, string userPassword)
        {
            return await _repository.CheckUserPasswordAsync(user, userPassword);
        }
    }
}
