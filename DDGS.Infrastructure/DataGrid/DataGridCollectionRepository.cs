using DDGS.Core.DataGrid.Interfaces.Repositories;
using DDGS.Core.DataGrid.Models;
using DDGS.Core.DataGridRow.Models;
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

            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());
            var options = new CreateIndexOptions { Unique = true };

            var session = DbSessionProvider.GetCurrentSession();
#pragma warning disable CS0618 // Type or member is obsolete
            if (session != null)
            {
                await collection.Indexes.CreateOneAsync(
                    session,
                    $"{{ {nameof(DataGridRowEntity.Index)} : 1 }}",
                    options);
            }
            else
            {
                await collection.Indexes.CreateOneAsync(
                    $"{{ {nameof(DataGridRowEntity.Index)} : 1 }}",
                    options);
            }
#pragma warning restore CS0618 // Type or member is obsolete
           
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
                new BsonDocument("$set", new BsonDocument(dataGridColumn.Name, bsonValue)));

            return Result.Ok();
        }

        public async Task<Result> RemoveElementFromAllDocumentsInCollectionAsync(DataGridEntity dataGrid, DataGridColumnEntity dataGridColumn)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());

            await UpdateManyAsync(
                collection,
                new BsonDocument(),
                new BsonDocument("$unset", new BsonDocument(dataGridColumn.Name, 1)));

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
