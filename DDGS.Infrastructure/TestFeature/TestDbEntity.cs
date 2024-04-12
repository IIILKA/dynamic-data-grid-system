using DDGS.Infrastructure.Core;

namespace DDGS.Infrastructure.TestFeature
{
    public class TestDbEntity : DbEntity
    {
        public required string Name { get; set; }
    }
}
