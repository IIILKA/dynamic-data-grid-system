using Mapster;
using MapsterMapper;

namespace DDGS.Identity.Configuration
{
    public static class MappingConfiguration
    {
        public static IServiceCollection AddMapper(
            this IServiceCollection services,
            TypeAdapterConfig typeAdapterConfig)
        {
            services.AddMapster();

            services.AddSingleton(typeAdapterConfig);

            services.AddScoped<IMapper, ServiceMapper>();

            return services;
        }
    }
}
