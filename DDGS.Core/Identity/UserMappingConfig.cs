using DDGS.Core.Identity.Models;
using DDGS.Core.Identity.Models.Payloads;
using Mapster;
using Microsoft.AspNetCore.Identity;

namespace DDGS.Core.Identity
{
    public class UserMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<UserRegisterPayload, UserEntity>()
                .Map(dest => dest.UserName, src => src.Username);

            config.NewConfig<UserAddExternalLoginPayload, UserLoginInfo>()
                .ConstructUsing(src =>
                    new UserLoginInfo(
                        src.ProviderName,
                        src.ExternalLoginUserId,
                        src.ProviderDisplayedName));
        }
    }
}
