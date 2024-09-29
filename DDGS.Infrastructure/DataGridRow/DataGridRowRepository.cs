using DDGS.Core.DataGrid.Models;
using FluentResults;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MapsterMapper;
using DDGS.Core.DataGridRow.Models;
using DDGS.Core.DataGridRow.Interfaces.Repositories;
using DDGS.Infrastructure.DataGridRow.Interfaces;
using DDGS.Infrastructure.MongoDb;
using DDGS.Infrastructure.MongoDb.Interfaces;

namespace DDGS.Infrastructure.DataGridRow
{
    public class DataGridRowRepository : MongoDbRepositoryBase, IDataGridRowRepository
    {
        private readonly IDataGridRowFactory _dataGridRowFactory;

        public DataGridRowRepository(
            IDataGridRowFactory dataGridRowFactory,
            IMongoClient client,
            IMongoDbSessionProvider dbSessionProvider,
            IMapper mapper,
            IOptions<MongoDbSettings> options)
            : base(client, dbSessionProvider, mapper, options)
        {
            _dataGridRowFactory = dataGridRowFactory;
        }

        public async Task<DataGridRowEntity?> GetAsync(DataGridEntity dataGrid, string rowId)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());
            var document = await collection
                .Find(new BsonDocument { { "_id", new BsonObjectId(new ObjectId(rowId)) } })
                .FirstOrDefaultAsync();

            return document == null ? null : _dataGridRowFactory.CreateDataGridRowEntity(document);
        }

        public async Task<List<DataGridRowEntity>> GetByDataGridAsync(DataGridEntity dataGrid)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());
            var documents = await collection.Find("{}").ToListAsync();

            var result = documents.Select(_dataGridRowFactory.CreateDataGridRowEntity).ToList();

            return result;
        }

        public async Task<Result> CreateAsync(DataGridEntity dataGrid, DataGridRowEntity dataGridRow)
        {
            var bsonDoc = _dataGridRowFactory.CreateBsonDocument(dataGridRow, true);
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());

            await InsertOneAsync(collection, bsonDoc);

            return Result.Ok();
        }

        public async Task<Result> UpdateAsync(DataGridEntity dataGrid, string rowId, DataGridRowEntity partialDataGridRow)
        {
            var bsonDoc = _dataGridRowFactory.CreateBsonDocument(partialDataGridRow, true, true);
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());

            await UpdateOneAsync(
                collection,
                new BsonDocument { { "_id", new BsonObjectId(new ObjectId(rowId)) } },
                new BsonDocument("$set", bsonDoc));

            return Result.Ok();
        }

        public async Task<Result> IncrementIndexesAfterRowAsync(DataGridEntity dataGrid, int index)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());

            await UpdateManyAsync(
                collection,
                new BsonDocument { { nameof(DataGridRowEntity.Index), new BsonDocument("$gt", index) } },
                new BsonDocument("$inc", new BsonDocument(nameof(DataGridRowEntity.Index), 1)));

            return Result.Ok();
        }

        public async Task<Result> DecrementIndexesAfterRowAsync(DataGridEntity dataGrid, int index)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());

            await UpdateManyAsync(
                collection,
                new BsonDocument { { nameof(DataGridRowEntity.Index), new BsonDocument("$gt", index) } },
                new BsonDocument("$inc", new BsonDocument(nameof(DataGridRowEntity.Index), -1)));

            return Result.Ok();
        }

        public async Task<Result> DeleteAsync(DataGridEntity dataGrid, string rowId)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());

            await DeleteOneAsync(collection, new BsonDocument { { "_id", new BsonObjectId(new ObjectId(rowId)) } });

            return Result.Ok();
        }
    }
}
