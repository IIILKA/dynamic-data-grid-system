using DDGS.Core.TestFeature.Payloads;
using Mapster;

namespace DDGS.Core.TestFeature.Maps
{
    public class TestMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<TestCreatePayload, Test>()
                .Map(dest => dest.Id, src => Guid.NewGuid());

            config.NewConfig<TestEditPayload, Test>();
        }
    }
}
