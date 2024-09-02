using DDGS.Core.Core.Interfaces;
using DDGS.Infrastructure.Core;
using DDGS.Infrastructure.MongoDb.Interfaces;

namespace DDGS.Api.Configuration
{
    public static class DbConfiguration
    {
        //TODO: Возможно стоит объединить с MongoDbConfiguration и PostgresDbConfiguration
        public static IServiceCollection AddDbServices(this IServiceCollection services)
        {
            services.AddScoped<UnitOfWork>();
            services.AddScoped<IUnitOfWork>(_ => _.GetRequiredService<UnitOfWork>());
            services.AddScoped<IMongoDbSessionProvider>(_ => _.GetRequiredService<UnitOfWork>());

            return services;
        }
    }
}
