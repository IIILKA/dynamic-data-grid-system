using Microsoft.EntityFrameworkCore.Design;
using System.CommandLine;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace DDGS.Infrastructure.PostgresDb
{
    public class PostgresDbDesignTimeDbContextFactory : IDesignTimeDbContextFactory<DdgsDbContext>
    {
        public DdgsDbContext CreateDbContext(string[] args)
        {
            var connectionString = GetConnectionStringFromArgs(args);

            var optionsBuilder = new DbContextOptionsBuilder<DdgsDbContext>();

            optionsBuilder.UseNpgsql(connectionString);

            //TODO: Remove if it is not necessary
            optionsBuilder.UseOpenIddict();

            return new DdgsDbContext(optionsBuilder.Options);
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
