using DDGS.Infrastructure.TestFeature;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure
{
    public class DdgsDbContext : DbContext
    {
        public DdgsDbContext(DbContextOptions<DdgsDbContext> options) : base(options) { }

        public DbSet<TestDbEntity> Tests => Set<TestDbEntity>();
    }
}
