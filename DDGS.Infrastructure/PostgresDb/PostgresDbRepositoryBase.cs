using DDGS.Core.Core;
using FluentResults;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DDGS.Infrastructure.PostgresDb
{
    public abstract class PostgresDbRepositoryBase<TEntity> where TEntity : Entity
    {
        protected PostgresDbRepositoryBase(DbContext dbContext)
        {
            DbContext = dbContext;
        }

        protected DbContext DbContext { get; }

        protected virtual DbSet<TEntity> EntitySet => DbContext.Set<TEntity>();

        protected virtual IQueryable<TEntity> SingleEntityQuery => EntitySet;

        protected virtual IQueryable<TEntity> ManyEntitiesQuery => EntitySet;

        public virtual async Task<TEntity?> GetAsync(Guid id)
        {
            return await SingleEntityQuery
                .FirstOrDefaultAsync(_ => _.Id == id);
        }

        public virtual async Task<List<TEntity>> GetAllAsync()
        {
            return await ManyEntitiesQuery
                .ToListAsync();
        }

        public virtual async Task<TEntity?> GetAsync(Expression<Func<TEntity, bool>> filter)
        {
            return await SingleEntityQuery
                .FirstOrDefaultAsync(filter);
        }

        public virtual async Task<List<TEntity>> GetManyAsync(Expression<Func<TEntity, bool>> filter)
        {
            return await ManyEntitiesQuery
                .Where(filter)
                .ToListAsync();
        }

        public virtual async Task<Result> CreateAsync(TEntity entity)
        {
            await EntitySet.AddAsync(entity);
            await DbContext.SaveChangesAsync();
            return Result.Ok();
        }

        public virtual async Task<Result> UpdateAsync(TEntity entity)
        {
            EntitySet.Update(entity);
            await DbContext.SaveChangesAsync();
            return Result.Ok();
        }

        public virtual async Task<Result> UpdateManyAsync(List<TEntity> entities)
        {
            EntitySet.UpdateRange(entities);
            await DbContext.SaveChangesAsync();
            return Result.Ok();
        }

        public virtual async Task<Result> DeleteAsync(TEntity entity)
        {
            EntitySet.Remove(entity);
            await DbContext.SaveChangesAsync();
            return Result.Ok();
        }
    }
}
