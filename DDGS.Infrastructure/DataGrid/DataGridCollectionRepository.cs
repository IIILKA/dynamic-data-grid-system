using DDGS.Core.DataGrid.Interfaces.Repositories;
using DDGS.Core.DataGrid.Models;
using DDGS.Infrastructure.MongoDb;
using DDGS.Infrastructure.MongoDb.Interfaces;
using FluentResults;
using MapsterMapper;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DDGS.Infrastructure.DataGrid
{
    public class DataGridCollectionRepository : MongoDbRepositoryBase, IDataGridCollectionRepository
    {
        public DataGridCollectionRepository(
            IMongoClient client,
            IMongoDbSessionProvider dbSessionProvider,
            IMapper mapper,
            IOptions<MongoDbSettings> options)
            : base(client, dbSessionProvider, mapper, options) { }

        public async Task<Result> CreateAsync(DataGridEntity dataGrid)
        {
            await CreateCollectionAsync(dataGrid.Id.ToString());
            return Result.Ok();
        }

        public async Task<Result> DeleteAsync(DataGridEntity dataGrid)
        {
            await Database.DropCollectionAsync(dataGrid.Id.ToString());
            return Result.Ok();
        }

        public async Task<Result> AddElementToAllDocumentsInCollectionAsync(DataGridEntity dataGrid, DataGridColumnEntity dataGridColumn)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());
            var bsonValue = CreateDefaultBsonValueFromColumnType(dataGridColumn.Type);

            await UpdateManyAsync(
                collection,
                new BsonDocument(),
                new BsonDocument("$set", new BsonDocument(dataGridColumn.Name.ToLower(), bsonValue)));

            return Result.Ok();
        }

        public async Task<Result> RemoveElementFromAllDocumentsInCollectionAsync(DataGridEntity dataGrid, DataGridColumnEntity dataGridColumn)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());

            await UpdateManyAsync(
                collection,
                new BsonDocument(),
                new BsonDocument("$unset", new BsonDocument(dataGridColumn.Name.ToLower(), 1)));

            return Result.Ok();
        }

        private static BsonValue CreateDefaultBsonValueFromColumnType(DataGridColumnType type)
        {
            return type switch
            {
                DataGridColumnType.Text => new BsonString(""),
                DataGridColumnType.Number => new BsonInt32(0),
                DataGridColumnType.Boolean => new BsonBoolean(false),
                _ => throw new ArgumentOutOfRangeException()
            };
        }
    }
}
