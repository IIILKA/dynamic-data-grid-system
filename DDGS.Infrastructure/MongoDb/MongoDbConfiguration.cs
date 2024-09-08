using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace DDGS.Infrastructure.MongoDb
{
    public static class MongoDbConfiguration
    {
        public static IServiceCollection AddMongoDb(this IServiceCollection services)
        {
            var connectionString = Environment.GetEnvironmentVariable("MONGODB_URL");
            var dbName = Environment.GetEnvironmentVariable("MONGODB_NAME");

            if (connectionString == null)
            {
                throw new Exception("Connection string to MongoDb not define. Please set 'MONGODB_URL' environment variable.");
            }

            if (dbName == null)
            {
                throw new Exception("Database name for MongoDb not define. Please set 'MONGODB_NAME' environment variable.");
            }

            services.AddSingleton<IMongoClient>(new MongoClient(connectionString));
            services.Configure<MongoDbSettings>(_ => _.DatabaseName = dbName);

            return services;
        }
    }
}
