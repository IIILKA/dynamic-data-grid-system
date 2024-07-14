using DDGS.Infrastructure.TestFeature;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure
{
    public class DdgsMongoDbContext : DbContext
    {
        public DdgsMongoDbContext(DbContextOptions<DdgsMongoDbContext> options) : base(options) { }

        public DbSet<TestDbEntity> Tests => Set<TestDbEntity>();
    }
}
