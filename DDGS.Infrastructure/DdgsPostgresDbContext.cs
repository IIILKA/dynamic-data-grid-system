using DDGS.Core.Identity;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure
{
    public class DdgsPostgresDbContext : DbContext
    {
        public DdgsPostgresDbContext(DbContextOptions<DdgsPostgresDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
