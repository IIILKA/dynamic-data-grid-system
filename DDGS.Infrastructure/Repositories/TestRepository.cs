using DDGS.Core.Test;
using DDGS.Core.Test.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DDGS.Infrastructure.Repositories
{
    public class TestRepository : ITestRepository
    {
        private readonly DdgsDbContext _dbContext;

        public TestRepository(DdgsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Test>> GetManyAsync()
        {
            return await _dbContext.Tests.ToListAsync();
        }

        public async Task<Test> GetAsync(Guid id)
        {
            return (await _dbContext.Tests.FirstOrDefaultAsync(_ => _.Id == id))!;
        }

        public async Task<Test> CreateAsync(Test entity)
        {
            entity.Id = Guid.NewGuid();

            await _dbContext.Tests.AddAsync(entity);

            await _dbContext.SaveChangesAsync();

            return entity;
        }

        public async Task<Test> UpdateAsync(Test entity)
        {
            _dbContext.Tests.Update(entity);

            await _dbContext.SaveChangesAsync();

            return entity;
        }

        public async Task DeleteAsync(Guid id)
        {
            var entity = _dbContext.Tests.FirstOrDefault(_ => _.Id == id);

            if (entity == null)
            {
                return;
            }

            _dbContext.Tests.Remove(entity);

            await _dbContext.SaveChangesAsync();
        }
    }
}
