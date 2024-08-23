using DDGS.Core.DataGrid.Models;
using DDGS.Core.Identity.Entities;
using DDGS.Core.Identity.Entities.Constraints;
using DDGS.Infrastructure.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure
{
    public class DdgsPostgresDbContext : IdentityDbContext<User, Role, Guid>
    {
        public DdgsPostgresDbContext(DbContextOptions<DdgsPostgresDbContext> options) : base(options) { }

        public DbSet<DataGridEntity> DataGrids { get; set; }

        public DbSet<DataGridColumnEntity> DataGridColumns { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(builder =>
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
