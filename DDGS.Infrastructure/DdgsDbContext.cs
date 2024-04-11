using DDGS.Core.Test;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure
{
    public class DdgsDbContext : DbContext
    {
        public DdgsDbContext(DbContextOptions<DdgsDbContext> options) : base(options) { }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //    => optionsBuilder.UseMongoDB(_client, "DynamicDataGridSystemDb");

        public DbSet<Test> Tests => Set<Test>();
    }
}
