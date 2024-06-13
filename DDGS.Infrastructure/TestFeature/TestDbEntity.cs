using DDGS.Core.TestFeature;
using DDGS.Infrastructure.Core;
using Mapster;

namespace DDGS.Infrastructure.TestFeature
{
    [AdaptTwoWays(typeof(Test))]
    public class TestDbEntity : DbEntity
    {
        public required int Index { get; set; }

        public string? Login { get; set; }

        public string? Password { get; set; }

        public int Age { get; set; }

        public bool IsStudent { get; set; }
    }
}
