using DDGS.Core.TestFeature.Interfaces;
using Microsoft.EntityFrameworkCore;
using DDGS.Core.TestFeature;
using DDGS.Infrastructure.Core.Interfaces;
using MapsterMapper;

namespace DDGS.Infrastructure.TestFeature
{
    public class TestRepository : ITestRepository
    {
        private readonly DdgsDbContext _dbContext;

        private readonly IMapper _mapper;

        private readonly IEntityIdGenerator _entityIdGenerator;

        public TestRepository(DdgsDbContext dbContext, IMapper mapper, IEntityIdGenerator entityIdGenerator)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _entityIdGenerator = entityIdGenerator;
        }

        public async Task<List<Test>> GetManyAsync()
        {
            return _mapper.Map<List<Test>>(await _dbContext.Tests.ToListAsync());
        }

        public async Task<Test?> GetAsync(Guid id)
        {
            return _mapper.Map<Test>((await _dbContext.Tests.FirstOrDefaultAsync(_ => _.Id == id))!);
        }

        public async Task<Test> CreateAsync(Test entity)
        {
            entity.Id = _entityIdGenerator.GenerateId();

            var dbEntity =
                (await _dbContext.Tests.AddAsync(_mapper.Map<TestDbEntity>(entity)))
                .Entity;

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<Test>(dbEntity);
        }

        public async Task<Test?> UpdateAsync(Test entity)
        {
            var dbEntity = _dbContext.Tests.Update(_mapper.Map<TestDbEntity>(entity)).Entity;

            await _dbContext.SaveChangesAsync();

            return _mapper.Map<Test>(dbEntity);
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
