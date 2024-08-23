using System.ComponentModel.DataAnnotations;
using DDGS.Core.DataGrid.Interfaces;
using DDGS.Core.DataGrid.Models;
using FluentResults;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure.Repositories
{
    public class DataGridColumnRepository : IDataGridColumnRepository
    {
        private readonly DdgsPostgresDbContext _dbContext;

        private DbSet<DataGridColumnEntity> EntitySet => _dbContext.Set<DataGridColumnEntity>();
        private IQueryable <DataGridColumnEntity> SingleEntityQuery => EntitySet
            .Include(_ => _.DataGrid);
        private IQueryable<DataGridColumnEntity> ManyEntitiesQuery => EntitySet;

        public DataGridColumnRepository(DdgsPostgresDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<DataGridColumnEntity?> GetAsync(Guid id)
        {
            return await SingleEntityQuery.FirstOrDefaultAsync(_ => _.Id == id);
        }

        public async Task<DataGridColumnEntity?> GetByDataGridAndNameAsync(Guid dataGridId, string name)
        {
            return await SingleEntityQuery.FirstOrDefaultAsync(_ => _.DataGrid.Id == dataGridId && _.Name == name);
        }

        public async Task<List<DataGridColumnEntity>> GetByDataGridAsync(Guid dataGridId)
        {
            return await ManyEntitiesQuery.Where(_ => _.DataGrid.Id == dataGridId).ToListAsync();
        }

        public async Task<List<DataGridColumnEntity>> GetAllAsync()
        {
            return await ManyEntitiesQuery.ToListAsync();
        }

        public async Task<Result> CreateAsync(DataGridColumnEntity entity)
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
