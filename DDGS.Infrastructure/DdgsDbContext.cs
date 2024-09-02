using DDGS.Core.DataGrid.Models;
using DDGS.Core.Identity.Models;
using DDGS.Core.Identity.Models.Constraints;
using DDGS.Infrastructure.PostgresDb;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure
{
    public class DdgsDbContext : IdentityDbContext<UserEntity, RoleEntity, Guid>
    {
        public DdgsDbContext(DbContextOptions<DdgsDbContext> options) : base(options) { }

        public DbSet<DataGridEntity> DataGrids { get; set; }

        public DbSet<DataGridColumnEntity> DataGridColumns { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserEntity>(builder =>
            {
                builder.Property(_ => _.Id)
                    .HasDefaultValueSql($"{PostgresDbFunctionNames.GenerateUUIDv7}()");

                builder.Property(_ => _.UserName)
                    .IsRequired()
                    .HasMaxLength(UserConstraints.UsernameMaxLength);

                builder.Property(_ => _.Email)
                    .IsRequired();
            });

            modelBuilder.Entity<DataGridEntity>(builder =>
            {
                builder.Property(_ => _.Id)
                    .HasDefaultValueSql($"{PostgresDbFunctionNames.GenerateUUIDv7}()");
            });

            modelBuilder.Entity<DataGridColumnEntity>(builder =>
            {
                builder.Property(_ => _.Id)
                    .HasDefaultValueSql($"{PostgresDbFunctionNames.GenerateUUIDv7}()");
            });
        }
    }
}
