using System.Text.Json;
using DDGS.Core.DataGridRow.Models;
using Mapster;
using MongoDB.Bson;

namespace DDGS.Infrastructure.DataGridRow.Maps
{
    public class DataGridRowPersistenceMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<DataGridRowEntity, BsonDocument>()
                .ConstructUsing(src =>
                    new BsonDocument(src.RowData.ToDictionary(
                        kvp => kvp.Key,
                        kvp => ConvertJsonElementToBsonValue((JsonElement)kvp.Value))));
        }

        private BsonValue ConvertJsonElementToBsonValue(JsonElement element)
        {
            return element.ValueKind switch
            {
                JsonValueKind.String => element.GetString(),
                JsonValueKind.Number => element.TryGetInt32(out var intValue)
                    ? (BsonValue)intValue
                    : element.TryGetDouble(out var doubleValue)
                        ? (BsonValue)doubleValue
                        : element.GetDecimal(),
                JsonValueKind.True => true,
                JsonValueKind.False => false,
                JsonValueKind.Null => BsonNull.Value,
                JsonValueKind.Object => BsonDocument.Parse(element.GetRawText()),
                JsonValueKind.Array => new BsonArray(element.EnumerateArray().Select(ConvertJsonElementToBsonValue)),
                _ => throw new ArgumentException($"Unsupported JsonValueKind: {element.ValueKind}")
            };
        }
    }
}
