using MongoDB.Driver;

namespace DDGS.Infrastructure.MongoDb.Interfaces
{
    public interface IMongoDbSessionProvider
    {
        IClientSessionHandle? GetCurrentSession();
    }
}
