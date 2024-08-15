namespace DDGS.Api.Configuration
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
                            .WithOrigins(spaClientUrl);
                    }
                });
            });

            return services;
        }
    }
}
