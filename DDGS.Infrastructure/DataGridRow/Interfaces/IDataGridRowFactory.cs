using DDGS.Core.DataGridRow.Models;
using MongoDB.Bson;

namespace DDGS.Infrastructure.DataGridRow.Interfaces
{
    public interface IDataGridRowFactory
    {
        //TODO: надо придумать что-то получше параметров на игнор свойств (если возможно)
        BsonDocument CreateBsonDocument(DataGridRowEntity entity, bool ignoreId = false, bool ignoreIndex = false);

        DataGridRowEntity CreateDataGridRowEntity(BsonDocument document);
    }
}
