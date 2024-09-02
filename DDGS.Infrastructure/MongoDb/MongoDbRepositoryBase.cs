using DDGS.Infrastructure.MongoDb.Interfaces;
using MapsterMapper;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DDGS.Infrastructure.MongoDb
{
    public abstract class MongoDbRepositoryBase
    {
        protected MongoDbRepositoryBase(
            IMongoClient client,
            IMongoDbSessionProvider dbSessionProvider,
            IMapper mapper,
            IOptions<MongoDbSettings> options)
        {
            Database = client.GetDatabase(options.Value.DatabaseName);
            DbSessionProvider = dbSessionProvider;
            Mapper = mapper;
        }

        protected IMongoDatabase Database { get; }

        protected IMongoDbSessionProvider DbSessionProvider { get; }

        protected IMapper Mapper { get; }

        protected async Task CreateCollectionAsync(string name)
        {
            var session = DbSessionProvider.GetCurrentSession();
            if (session == null)
            {
                await Database.CreateCollectionAsync(name);
            }
            else
            {
                await Database.CreateCollectionAsync(session, name);
            }
        }

        protected async Task InsertOneAsync(IMongoCollection<BsonDocument> collection, BsonDocument bsonDocument)
        {
            var session = DbSessionProvider.GetCurrentSession();
            if (session == null)
            {
                await collection.InsertOneAsync(bsonDocument);
            }
            else
            {
                await collection.InsertOneAsync(session, bsonDocument);
            }
        }

        protected async Task ReplaceOneAsync(IMongoCollection<BsonDocument> collection, BsonDocument filter, BsonDocument bsonDocument)
        {
            var session = DbSessionProvider.GetCurrentSession();
            if (session == null)
            {
                await collection.ReplaceOneAsync(filter, bsonDocument);
            }
            else
            {
                await collection.ReplaceOneAsync(session, filter, bsonDocument);
            }
        }

        protected async Task DeleteOneAsync(IMongoCollection<BsonDocument> collection, BsonDocument filter)
        {
            var session = DbSessionProvider.GetCurrentSession();
            if (session == null)
            {
                await collection.DeleteOneAsync(filter);
            }
            else
            {
                await collection.DeleteOneAsync(session, filter);
            }
        }

        protected async Task UpdateManyAsync(IMongoCollection<BsonDocument> collection, BsonDocument filter, BsonDocument bsonDocument)
        {
            var session = DbSessionProvider.GetCurrentSession();
            if (session == null)
            {
                await collection.UpdateManyAsync(filter, bsonDocument);
            }
            else
            {
                await collection.UpdateManyAsync(session, filter, bsonDocument);
            }
        }
    }
}
