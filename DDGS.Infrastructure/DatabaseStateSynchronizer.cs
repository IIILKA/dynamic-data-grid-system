using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace DDGS.Infrastructure
{
    public static class DatabaseStateSynchronizer
    {
        public static async Task SyncMigrationsAsync<T>(IHost host)
            where T : DbContext
        {
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<T>();
            var logger = services.GetRequiredService<ILogger<T>>();

            await SyncMigrationsAsync<T>(logger, context);
        }

        public static async Task SyncMigrationsAsync<T>(ILogger<T> logger, T dbContext)
            where T : DbContext
        {
            logger.LogInformation($"Auto migration started");

            try
            {
                var pendingMigrations = (await dbContext.Database.GetPendingMigrationsAsync()).ToArray();
                if (pendingMigrations.Any())
                {
                    await dbContext.Database.MigrateAsync();
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "An error occurred while migrating the database.");

                throw;
            }

            logger.LogInformation($"Auto migration finished");
        }
    }
}
