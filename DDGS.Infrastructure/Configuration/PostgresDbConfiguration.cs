using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DDGS.Infrastructure.Configuration
{
    public static class PostgresDbConfiguration
    {
        public static IServiceCollection AddPostgresDbServices(this IServiceCollection services)
        {
            var connectionString = Environment.GetEnvironmentVariable("POSTGRESDB_URL");

            if (connectionString == null)
            {
                throw new Exception("Connection string to PostgresDb not define. Please set 'POSTGRESDB_URL' environment variable.");
            }

            services.AddDbContext<DdgsPostgresDbContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });

            return services;
        }
    }
}
