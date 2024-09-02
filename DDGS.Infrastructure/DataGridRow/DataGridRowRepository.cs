using DDGS.Core.DataGrid.Models;
using FluentResults;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Dynamic;
using MapsterMapper;
using DDGS.Core.DataGridRow.Models;
using DDGS.Core.DataGridRow.Interfaces.Repositories;
using DDGS.Infrastructure.MongoDb;
using DDGS.Infrastructure.MongoDb.Interfaces;

namespace DDGS.Infrastructure.DataGridRow
{
    public class DataGridRowRepository : MongoDbRepositoryBase, IDataGridRowRepository
    {
        public DataGridRowRepository(
            IMongoClient client,
            IMongoDbSessionProvider dbSessionProvider,
            IMapper mapper,
            IOptions<MongoDbSettings> options)
            : base(client, dbSessionProvider, mapper, options) { }

        public async Task<DataGridRowEntity?> GetAsync(DataGridEntity dataGrid, string rowId)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());
            var document = await collection
                .Find(new BsonDocument { { "_id", new BsonObjectId(new ObjectId(rowId)) } })
                .FirstOrDefaultAsync();
            if (document == null)
            {
                return null;
            }

            var expando = CreateExpandoFromBsonDocument(document);

            return new DataGridRowEntity { Elements = expando };
        }

        public async Task<List<DataGridRowEntity>> GetByDataGridAsync(DataGridEntity dataGrid)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());
            var documents = await collection.Find("{}").ToListAsync();

            var result = documents
                .Select(_ => new DataGridRowEntity { Elements = CreateExpandoFromBsonDocument(_) })
                .ToList();

            return result;
        }

        public async Task<Result> CreateAsync(DataGridEntity dataGrid, DataGridRowEntity dataGridRow)
        {
            var bsonDoc = Mapper.Map<BsonDocument>(dataGridRow);
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());

            await InsertOneAsync(collection, bsonDoc);

            return Result.Ok();
        }

        public async Task<Result> UpdateAsync(DataGridEntity dataGrid, string rowId, DataGridRowEntity dataGridRow)
        {
            var bsonDoc = Mapper.Map<BsonDocument>(dataGridRow);
            bsonDoc["_id"] = new BsonObjectId(new ObjectId(rowId));
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());

            await ReplaceOneAsync(
                collection,
                new BsonDocument { { "_id", new BsonObjectId(new ObjectId(rowId)) } },
                bsonDoc);

            return Result.Ok();
        }

        public async Task<Result> DeleteAsync(DataGridEntity dataGrid, string rowId)
        {
            var collection = Database.GetCollection<BsonDocument>(dataGrid.Id.ToString());

            await DeleteOneAsync(collection, new BsonDocument { { "_id", new BsonObjectId(new ObjectId(rowId)) } });

            return Result.Ok();
        }

        private static IDictionary<string, object> CreateExpandoFromBsonDocument(BsonDocument document)
        {
            var expando = new ExpandoObject() as IDictionary<string, object>;
            foreach (var element in document.Elements)
            {
                expando[element.Name] = element.Value switch
                {
                    BsonObjectId id => id.ToString(),
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
