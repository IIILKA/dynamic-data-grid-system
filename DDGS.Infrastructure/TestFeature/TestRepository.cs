using DDGS.Core.TestFeature.Interfaces;
using Microsoft.EntityFrameworkCore;
using DDGS.Core.TestFeature;
using DDGS.Infrastructure.Core.Interfaces;
using MapsterMapper;

namespace DDGS.Infrastructure.TestFeature
{
    public class TestRepository : ITestRepository
    {
        private readonly DdgsMongoDbContext _mongoDbContext;
        private readonly IMapper _mapper;
        private readonly IEntityIdGenerator _entityIdGenerator;

        public TestRepository(DdgsMongoDbContext mongoDbContext, IMapper mapper, IEntityIdGenerator entityIdGenerator)
        {
            _mongoDbContext = mongoDbContext;
            _mapper = mapper;
            _entityIdGenerator = entityIdGenerator;
        }

        public async Task<List<Test>> GetManyAsync()
        {
            return _mapper.Map<List<Test>>(await _mongoDbContext.Tests.AsNoTracking().ToListAsync());
        }

        public async Task<Test?> GetAsync(Guid id)
        {
            return _mapper.Map<Test>((await _mongoDbContext.Tests.AsNoTracking().FirstOrDefaultAsync(_ => _.Id == id))!);
        }

        public async Task<Test> CreateAsync(Test entity)
        {
            entity.Id = _entityIdGenerator.GenerateId();

            var dbEntity =
                (await _mongoDbContext.Tests.AddAsync(_mapper.Map<TestDbEntity>(entity)))
                .Entity;

            await _mongoDbContext.SaveChangesAsync();

            return _mapper.Map<Test>(dbEntity);
        }

        public async Task<Test?> UpdateAsync(Test entity)
        {
            var dbEntity = _mongoDbContext.Tests.Update(_mapper.Map<TestDbEntity>(entity)).Entity;

            await _mongoDbContext.SaveChangesAsync();

            return _mapper.Map<Test>(dbEntity);
        }

        public async Task DeleteAsync(Guid id)
        {
            var dbEntity = _mongoDbContext.Tests.FirstOrDefault(_ => _.Id == id);

            if (dbEntity == null)
            {
                return;
            }

            _mongoDbContext.Tests.Remove(dbEntity);

            await _mongoDbContext.SaveChangesAsync();
        }
    }
}
