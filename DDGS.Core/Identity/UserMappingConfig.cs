using DDGS.Core.Identity.Entities;
using DDGS.Core.Identity.Payloads;
using Mapster;
using Microsoft.AspNetCore.Identity;

namespace DDGS.Core.Identity
{
    public class UserMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<UserRegisterPayload, User>()
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
