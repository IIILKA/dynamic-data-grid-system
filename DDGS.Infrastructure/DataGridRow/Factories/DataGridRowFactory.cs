using DDGS.Core.DataGridRow.Models;
using DDGS.Infrastructure.DataGridRow.Interfaces;
using MongoDB.Bson;
using System.Dynamic;
using System.Text.Json;

namespace DDGS.Infrastructure.DataGridRow.Factories
{
    public class DataGridRowFactory : IDataGridRowFactory
    {
        public BsonDocument CreateBsonDocument(DataGridRowEntity entity, bool ignoreId = false, bool ignoreIndex = false)
        {
            var docDic = entity.RowData.ToDictionary(
                kvp => kvp.Key,
                kvp => ConvertJsonElementToBsonValue((JsonElement)kvp.Value));
            if (!ignoreId)
            {
                docDic.Add("_id", new BsonObjectId(new ObjectId(entity.Id)));
            }
            if (!ignoreIndex)
            {
                docDic.Add(nameof(DataGridRowEntity.Index), entity.Index);
            }

            return new BsonDocument(docDic);
        }

        public DataGridRowEntity CreateDataGridRowEntity(BsonDocument document)
        {
            var id = document["_id"].AsObjectId.ToString()!;
            document.Remove("_id");

            var name = nameof(DataGridRowEntity.Index);
            var index = document[name].AsInt32;
            document.Remove(name);

            var expando = CreateExpandoFromBsonDocument(document);
            return new DataGridRowEntity { Id = id, Index = index, RowData = expando };
        }

        private static BsonValue ConvertJsonElementToBsonValue(JsonElement element)
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

        private static IDictionary<string, object> CreateExpandoFromBsonDocument(BsonDocument document)
        {
            var expando = new ExpandoObject() as IDictionary<string, object>;
            foreach (var element in document.Elements)
            {
                expando[element.Name] = element.Value switch
                {
                    BsonString str => str.ToString(),
                    BsonInt32 num => num.ToInt32(),
                    BsonBoolean b => b.ToBoolean(),
                    _ => throw new InvalidDataException()
                };
            }
            return expando;
        }
    }
}
