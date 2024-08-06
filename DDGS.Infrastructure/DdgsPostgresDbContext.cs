using DDGS.Core.Identity.Entities;
using DDGS.Infrastructure.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure
{
    public class DdgsPostgresDbContext : IdentityDbContext<User, Role, Guid>
    {
        public DdgsPostgresDbContext(DbContextOptions<DdgsPostgresDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(builder =>
            {
                builder.Property(_ => _.Id)
                    .HasDefaultValueSql($"{PostgresDbFunctionNames.GenerateUUIDv7}()");
            });
        }
    }
}
