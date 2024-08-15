namespace DDGS.Identity.Configuration
{
    public static class CorsConfiguration
    {
        public static IServiceCollection AddDdgsCors(this IServiceCollection services)
        {
            services.AddCors(opts =>
            {
                opts.AddDefaultPolicy(policy =>
                {
                    var spaClientUrl = Environment.GetEnvironmentVariable("CLIENT_URL");

                    if (spaClientUrl != null)
                    {
                        policy
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .AllowCredentials()
                            .WithOrigins(spaClientUrl);
                    }

                    var resourceServerUrl = Environment.GetEnvironmentVariable("AUTH_RESOURCE_SERVER_URL");

                    if (resourceServerUrl != null)
                    {
                        policy
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .WithOrigins(resourceServerUrl);
                    }
                });
            });


            return services;
        }
    }
}
