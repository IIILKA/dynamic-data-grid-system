namespace DDGS.Core.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable, IAsyncDisposable
    {
        Task BeginTransactionAsync();

        Task CommitAsync();

        Task RollbackAsync();
    }

}
