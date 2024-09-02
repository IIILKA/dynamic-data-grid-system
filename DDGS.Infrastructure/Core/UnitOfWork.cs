using DDGS.Core.Core.Interfaces;
using DDGS.Infrastructure.MongoDb.Interfaces;
using Microsoft.EntityFrameworkCore.Storage;
using MongoDB.Driver;

namespace DDGS.Infrastructure.Core
{
    public class UnitOfWork : IUnitOfWork, IMongoDbSessionProvider
    {
        private readonly DdgsDbContext _dbContext;
        private readonly IMongoClient _mongoClient;

        private IDbContextTransaction? _transaction;
        private IClientSessionHandle? _mongoSession;

        public UnitOfWork(DdgsDbContext dbContext, IMongoClient mongoClient)
        {
            _dbContext = dbContext;
            _mongoClient = mongoClient;
        }

        public async Task BeginTransactionAsync()
        {
            _transaction = await _dbContext.Database.BeginTransactionAsync();

            _mongoSession = await _mongoClient.StartSessionAsync();
            _mongoSession.StartTransaction();
        }

        public async Task CommitAsync()
        {
            await _transaction!.CommitAsync();

            await _mongoSession!.CommitTransactionAsync();
        }

        public async Task RollbackAsync()
        {
            await _transaction!.RollbackAsync();

            await _mongoSession!.AbortTransactionAsync();
        }

        public async ValueTask DisposeAsync()
        {
            if (_transaction != null)
            {
                await _transaction.DisposeAsync();
            }

            _mongoSession?.Dispose();
        }

        public void Dispose()
        {
            _transaction?.Dispose();

            _mongoSession?.Dispose();
        }

        public IClientSessionHandle? GetCurrentSession()
        {
            return _mongoSession;
        }
    }
}
