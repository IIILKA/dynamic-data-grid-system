using DDGS.Core.TestFeature.Payloads;
using Mapster;

namespace DDGS.Core.TestFeature.Maps
{
    public class TestMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<TestCreatePayload, Test>()
                .Map(dest => dest.Id, src => default(Guid));

            config.NewConfig<TestEditPayload, Test>()
                .Map(dest => dest.Id, src => default(Guid));
        }
    }
}
