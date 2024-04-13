using DDGS.Core.TestFeature.Interfaces;
using DDGS.Core.TestFeature.Payloads;
using Mapster;
using MapsterMapper;

namespace DDGS.Core.TestFeature
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _testRepository;

        private readonly IMapper _mapper;

        public TestService(ITestRepository testRepository, IMapper mapper)
        {
            _testRepository = testRepository;
            _mapper = mapper;
        }

        public async Task<List<Test>> GetManyAsync()
        {
            var entityList = await _testRepository.GetManyAsync();

            return entityList;
        }

        public async Task<Test?> GetAsync(Guid id)
        {
            var entity = await _testRepository.GetAsync(id);

            return entity;
        }

        public async Task<Test> CreateAsync(TestCreatePayload payload)
        {
            var entity = _mapper.Map<Test>(payload);

            return await _testRepository.CreateAsync(entity);
        }

        public async Task<Test?> UpdateAsync(Guid id, TestEditPayload payload)
        {
            var entity = _mapper.Map<Test>(payload);

            entity.Id = id;

            return await _testRepository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _testRepository.DeleteAsync(id);
        }
    }
}
