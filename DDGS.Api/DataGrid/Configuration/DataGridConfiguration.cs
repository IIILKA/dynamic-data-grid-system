using DDGS.Api.DataGrid.Maps;
using DDGS.Core.DataGrid;
using DDGS.Core.DataGrid.Interfaces.Repositories;
using DDGS.Core.DataGrid.Interfaces.Services;
using DDGS.Core.DataGrid.Maps;
using DDGS.Core.DataGridRow;
using DDGS.Core.DataGridRow.Interfaces.Repositories;
using DDGS.Core.DataGridRow.Interfaces.Services;
using DDGS.Infrastructure.DataGrid;
using DDGS.Infrastructure.DataGridRow;
using DDGS.Infrastructure.DataGridRow.Maps;
using Mapster;

namespace DDGS.Api.DataGrid.Configuration
{
    public static class DataGridConfiguration
    {
        public static IServiceCollection AddDataGrid(this IServiceCollection services, TypeAdapterConfig typeAdapterConfig)
        {
            new DataGridDtoMappingConfig().Register(typeAdapterConfig);
            new DataGridRowMappingConfig().Register(typeAdapterConfig);
            new DataGridRowPersistenceMappingConfig().Register(typeAdapterConfig);

            services.AddScoped<IDataGridRepository, DataGridRepository>();
            services.AddScoped<IDataGridColumnRepository, DataGridColumnRepository>();
            services.AddScoped<IDataGridCollectionRepository, DataGridCollectionRepository>();
            services.AddScoped<IDataGridRowRepository, DataGridRowRepository>();

            services.AddScoped<IDataGridService, DataGridService>();
            services.AddScoped<IDataGridRowService, DataGridRowService>();

            return services;
        }
    }
}
