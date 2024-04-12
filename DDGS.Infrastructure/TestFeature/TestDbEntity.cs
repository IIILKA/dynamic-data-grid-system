using DDGS.Core.TestFeature;
using DDGS.Infrastructure.Core;
using Mapster;

namespace DDGS.Infrastructure.TestFeature
{
    [AdaptTwoWays(typeof(Test))]
    public class TestDbEntity : DbEntity
    {
        public required string Name { get; set; }
    }
}
