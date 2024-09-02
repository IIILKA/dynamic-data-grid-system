using System.Text.Json;
using DDGS.Core.DataGridRow.Models;
using DDGS.Core.DataGridRow.Models.Payloads;
using Mapster;

namespace DDGS.Core.DataGrid.Maps
{
    public class DataGridRowMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<DataGridRowCreatePayload, DataGridRowEntity>()
                .Map(dest => dest.Elements, src => DeserializeJsonRow(src.JsonRow));

            config.NewConfig<DataGridRowUpdatePayload, DataGridRowEntity>()
                .Map(dest => dest.Elements, src => DeserializeJsonRow(src.JsonRow));
        }

        private static Dictionary<string, object> DeserializeJsonRow(string jsonRow)
        {
            return JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonRow, new JsonSerializerOptions())!
                .ToDictionary(kvp => kvp.Key.ToLower(), kvp => (object)kvp.Value);
        }
    }
}
