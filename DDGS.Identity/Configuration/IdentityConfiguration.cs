using DDGS.Core.User;
using DDGS.Core.User.Interfaces;
using DDGS.Infrastructure.Repositories;
using DDGS.Infrastructure;
using Mapster;
using Microsoft.AspNetCore.Identity;

namespace DDGS.Identity.Configuration
{
    public static class IdentityConfiguration
    {
        public static IServiceCollection AddDdgsIdentity(this IServiceCollection services, TypeAdapterConfig typeAdapterConfig)
        {
            services.AddIdentity<Core.User.User, IdentityRole<Guid>>(opts =>
            {
                opts.Password.RequireDigit = true;
                opts.Password.RequireLowercase = true;
                opts.Password.RequireNonAlphanumeric = true;
                opts.Password.RequireUppercase = true;
                opts.Password.RequiredLength = 6;
                opts.Password.RequiredUniqueChars = 1;

                opts.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                opts.Lockout.MaxFailedAccessAttempts = 5;
                opts.Lockout.AllowedForNewUsers = true;

                opts.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                opts.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<DdgsPostgresDbContext>();


            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();

            return services;
        }
    }
}
