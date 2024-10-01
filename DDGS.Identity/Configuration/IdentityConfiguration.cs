using DDGS.Core.Identity;
using DDGS.Core.Identity.Interfaces;
using DDGS.Core.Identity.Models;
using DDGS.Core.Identity.Models.Constraints;
using DDGS.Infrastructure;
using Mapster;
using DDGS.Infrastructure.Identity;

namespace DDGS.Identity.Configuration
{
    public static class IdentityConfiguration
    {
        public static IServiceCollection AddDdgsIdentity(this IServiceCollection services, TypeAdapterConfig typeAdapterConfig)
        {
            services.AddIdentity<UserEntity, RoleEntity>(opts =>
            {
                opts.Password.RequireDigit = true;
                opts.Password.RequireLowercase = true;
                opts.Password.RequireNonAlphanumeric = true;
                opts.Password.RequireUppercase = true;
                opts.Password.RequiredLength = UserConstraints.PasswordMinLength;
                opts.Password.RequiredUniqueChars = 1;

                opts.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                opts.Lockout.MaxFailedAccessAttempts = 5;
                opts.Lockout.AllowedForNewUsers = true;

                opts.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+абвгдеёжзийклмнопрстуфхцчшщыэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯ ";
                opts.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<DdgsDbContext>();

            new UserMappingConfig().Register(typeAdapterConfig);

            services.AddScoped<IIdentityRepository, IdentityRepository>();
            services.AddScoped<IIdentityService, IdentityService>();

            return services;
        }
    }
}
