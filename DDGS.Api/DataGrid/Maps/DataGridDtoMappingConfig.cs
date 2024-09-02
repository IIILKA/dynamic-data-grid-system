using DDGS.Api.DataGrid.Dto;
using DDGS.Core.DataGrid.Models;
using Mapster;

namespace DDGS.Api.DataGrid.Maps
{
    public class DataGridDtoMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<DataGridEntity, DataGridDetailsDto>()
                .Map(dest => dest.OwnerUsername, src => src.Owner.UserName);

            config.NewConfig<DataGridEntity, DataGridIndexDto>()
                .Map(dest => dest.OwnerUsername, src => src.Owner.UserName);
        }
    }
}
