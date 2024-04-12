using DDGS.Core.TestFeature.Interfaces;
using Microsoft.EntityFrameworkCore;
using DDGS.Core.TestFeature;

namespace DDGS.Infrastructure.TestFeature
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
            return (await _dbContext.Tests.ToListAsync()).Select(_ => new Test { Id = _.Id, Name = _.Name }).ToList();
        }

        public async Task<Test?> GetAsync(Guid id)
        {
            var dbEntity = await _dbContext.Tests.FirstOrDefaultAsync(_ => _.Id == id);

            return dbEntity != null ? new Test { Id = dbEntity.Id, Name = dbEntity.Name } : null;
        }

        public async Task<Test> CreateAsync(Test entity)
        {
            var dbEntity =
                (await _dbContext.Tests.AddAsync(new TestDbEntity { Id = entity.Id, Name = entity.Name }))
                .Entity;

            await _dbContext.SaveChangesAsync();

            return new Test { Id = dbEntity.Id, Name = dbEntity.Name };
        }

        public async Task<Test?> UpdateAsync(Test entity)
        {
            var dbEntity = _dbContext.Tests.Update(new TestDbEntity { Id = entity.Id, Name = entity.Name }).Entity;

            await _dbContext.SaveChangesAsync();

            return new Test { Id = dbEntity.Id, Name = dbEntity.Name };
        }

        public async Task DeleteAsync(Guid id)
        {
            var dbEntity = _dbContext.Tests.FirstOrDefault(_ => _.Id == id);

            if (dbEntity == null)
            {
                return;
            }

            _dbContext.Tests.Remove(dbEntity);

            await _dbContext.SaveChangesAsync();
        }
    }
}
