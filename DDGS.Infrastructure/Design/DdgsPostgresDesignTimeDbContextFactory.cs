using Microsoft.EntityFrameworkCore.Design;
using System.CommandLine;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DDGS.Infrastructure.Design
{
    public class DdgsPostgresDesignTimeDbContextFactory : IDesignTimeDbContextFactory<DdgsPostgresDbContext>
    {
        public DdgsPostgresDbContext CreateDbContext(string[] args)
        {
            var connectionString = GetConnectionStringFromArgs(args);

            var optionsBuilder = new DbContextOptionsBuilder<DdgsPostgresDbContext>();

            optionsBuilder.UseNpgsql(connectionString);

            optionsBuilder.UseOpenIddict();

            return new DdgsPostgresDbContext(optionsBuilder.Options);
        }

        private static string? GetConnectionStringFromArgs(string[] args)
        {
            if (!(args?.Any() ?? false))
            {
                return null;
            }

            string? connectionString = null;

            var connectionOption = new Option<string>(aliases: new[] { "-c", "--connection" })
            {
                IsRequired = true
            };

            try
            {
                var command = new RootCommand
                {
                    connectionOption
                };

                command.SetHandler(context => connectionString = context.ParseResult.GetValueForOption(connectionOption));

                _ = command.Invoke(args);
            }
            catch { connectionString = null; }

            return connectionString;
        }
    }
}
