using DDGS.Core.TestFeature.Interfaces;
using DDGS.Core.TestFeature;
using DDGS.Infrastructure.TestFeature;

namespace DDGS.Api.Configuration
{
    public static class TestConfiguration
    {
        public static IServiceCollection AddTestServices(this IServiceCollection services)
        {
            services.AddScoped<ITestRepository, TestRepository>();
            services.AddScoped<ITestService, TestService>();

            return services;
        }
    }
}
