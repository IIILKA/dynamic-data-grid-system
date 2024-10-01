using DDGS.Core.Identity.Interfaces;
using DDGS.Core.Identity.Models;
using DDGS.Core.Identity.Models.Payloads;
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

        public async Task<Result<UserEntity>> RegisterAsync(UserRegisterPayload payload, string userPassword)
        {
            var result = await _repository.RegisterUserAsync(_mapper.Map<UserEntity>(payload), userPassword);

            if (result.IsFailed)
            {
                return result;
            }

            var user = await _repository.GetUserByEmailAsync(payload.Email);

            return Result.Ok(user!);
        }

        public async Task<Result<UserEntity>> RegisterAsync(UserRegisterPayload payload)
        {
            var result = await _repository.RegisterUserAsync(_mapper.Map<UserEntity>(payload));

            if (result.IsFailed)
            {
                return result;
            }

            var user = await _repository.GetUserByEmailAsync(payload.Email);

            return Result.Ok(user!);
        }

        public async Task<UserEntity?> GetAsync(Guid id)
        {
            return await _repository.GetUserAsync(id);
        }

        public async Task<UserEntity?> GetByEmailAsync(string email)
        {
            return await _repository.GetUserByEmailAsync(email);
        }

        public async Task<List<UserEntity>> GetAllAsync()
        {
            return await _repository.GetAllUsersAsync();
        }

        public async Task<Result> AddExternalLoginAsync(UserEntity userEntity, UserAddExternalLoginPayload payload)
        {
            return await _repository.AddUserExternalLoginAsync(userEntity, _mapper.Map<UserLoginInfo>(payload));
        }

        public async Task<bool> DoesExternalLoginRegisteredAsync(
            UserEntity userEntity,
            string externalLoginProviderName,
            string externalLoginProviderUserId)
        {
            var userLogins = await _repository.GetUserLoginsAsync(userEntity);

            var externalLogin = userLogins.FirstOrDefault(_ =>
                _.LoginProvider == externalLoginProviderName && _.ProviderKey == externalLoginProviderUserId);

            return externalLogin != null;
        }

        public async Task<bool> CheckUserPasswordAsync(UserEntity userEntity, string userPassword)
        {
            return await _repository.CheckUserPasswordAsync(userEntity, userPassword);
        }
    }
}
