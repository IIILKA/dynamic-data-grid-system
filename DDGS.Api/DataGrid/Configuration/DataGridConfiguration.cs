using DDGS.Api.Cotext;
using DDGS.Core.DataGrid;
using DDGS.Core.DataGrid.Interfaces;
using DDGS.Core.Identity;
using DDGS.Core.Identity.Entities.Constraints;
using DDGS.Core.Identity.Entities;
using DDGS.Core.Identity.Interfaces;
using DDGS.Infrastructure;
using DDGS.Infrastructure.Repositories;
using Mapster;

namespace DDGS.Api.DataGrid.Configuration
{
    public static class DataGridConfiguration
    {
        public static IServiceCollection AddDataGrid(this IServiceCollection services, TypeAdapterConfig typeAdapterConfig)
        {
            new DataGridDtoMappingConfig().Register(typeAdapterConfig);

            services.AddScoped<IDataGridRepository, DataGridRepository>();
            services.AddScoped<IDataGridColumnRepository, DataGridColumnRepository>();

            services.AddScoped<IDataGridService, DataGridService>();

            services.AddIdentity<User, Role>(opts =>
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
            }).AddEntityFrameworkStores<DdgsPostgresDbContext>();

            services.AddScoped<IIdentityRepository, IdentityRepository>();
            services.AddScoped<IIdentityService, IdentityService>();
            services.AddScoped<IUserContextService, UserContextService>();

            return services;
        }
    }
}
