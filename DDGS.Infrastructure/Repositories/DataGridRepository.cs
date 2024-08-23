using System.ComponentModel.DataAnnotations;
using DDGS.Core.DataGrid.Interfaces;
using DDGS.Core.DataGrid.Models;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure.Repositories
{
    public class DataGridRepository : IDataGridRepository
    {
        private readonly DdgsPostgresDbContext _dbContext;
        private DbSet<DataGridEntity> EntitySet => _dbContext.Set<DataGridEntity>();
        private IQueryable<DataGridEntity> SingleEntityQuery => EntitySet
            .Include(_ => _.Owner)
            .Include(_ => _.Columns)
            .AsSplitQuery();
        //TODO: Возможно лучше стоит использовать DbDto для потенциально большого количества таблиц чтобы уменьшить нагрузку
        private IQueryable<DataGridEntity> ManyEntitiesQuery => EntitySet
            .Include(_ => _.Owner);

        public DataGridRepository(DdgsPostgresDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<DataGridEntity?> GetAsync(Guid id)
        {
            return await SingleEntityQuery.FirstOrDefaultAsync(_ => _.Id == id);
        }

        public async Task<List<DataGridEntity>> GetByUserAsync(Guid userId)
        {
            return await ManyEntitiesQuery.Where(_ => _.Owner.Id == userId).ToListAsync();
        }

        public async Task<List<DataGridEntity>> GetAllAsync()
        {
            return await ManyEntitiesQuery.ToListAsync();
        }

        public async Task<Result> CreateAsync(DataGridEntity entity)
        {
            //TODO: Зарефакторить сообщения об ошибках таким образом чтобы они не раскрывали детали кода и были более понятные конченому пользователю
            try
            {
                await EntitySet.AddAsync(entity);
                await _dbContext.SaveChangesAsync();
                return Result.Ok();
            }
            catch (ValidationException e)
            {
                return Result.Fail(e.Message);
            }
            catch (DbUpdateConcurrencyException)
            {
                return Result.Fail("Concurrency conflict: data was modified by another user or process");
            }
            catch (DbUpdateException e)
            {
                return Result.Fail(e.Message);
            }
        }

        public async Task<Result> UpdateAsync(DataGridEntity entity)
        {
            //TODO: Зарефакторить сообщения об ошибках таким образом чтобы они не раскрывали детали кода и были более понятные конченому пользователю
            try
            {
                EntitySet.Update(entity);
                await _dbContext.SaveChangesAsync();
                return Result.Ok();
            }
            catch (ValidationException e)
            {
                return Result.Fail(e.Message);
            }
            catch (DbUpdateConcurrencyException)
            {
                return Result.Fail("Concurrency conflict: data was modified by another user or process");
            }
            catch (DbUpdateException e)
            {
                return Result.Fail(e.Message);
            }
        }

        public async Task<Result> DeleteAsync(Guid id)
        {
            var entity = await EntitySet.FirstOrDefaultAsync(_ => _.Id == id);

            if (entity == null)
            {
                return Result.Fail("Data grid does not exist");
            }

            //TODO: Зарефакторить сообщения об ошибках таким образом чтобы они не раскрывали детали кода и были более понятные конченому пользователю
            try
            {
                EntitySet.Remove(entity);
                await _dbContext.SaveChangesAsync();
                return Result.Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Result.Fail("Concurrency conflict: data was modified by another user or process");
            }
            catch (DbUpdateException e)
            {
                return Result.Fail(e.Message);
            }
        }
    }
}
