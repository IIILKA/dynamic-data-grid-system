using DDGS.Core.TestFeature.Interfaces;
using DDGS.Core.TestFeature.Payloads;

namespace DDGS.Core.TestFeature
{
    public class TestService : ITestService
    {
        private readonly ITestRepository _testRepository;

        public TestService(ITestRepository testRepository)
        {
            _testRepository = testRepository;
        }

        public async Task<List<Test>> GetManyAsync()
        {
            return await _testRepository.GetManyAsync();
        }

        public async Task<Test?> GetAsync(Guid id)
        {
            return await _testRepository.GetAsync(id);
        }

        public async Task<Test> CreateAsync(TestCreatePayload payload)
        {
            var entity = new Test { Id = Guid.NewGuid(), Name = payload.Name };

            return await _testRepository.CreateAsync(entity);
        }

        public async Task<Test?> UpdateAsync(TestEditPayload payload)
        {
            var entity = new Test { Id = payload.Id, Name = payload.Name };

            return await _testRepository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _testRepository.DeleteAsync(id);
        }
    }
}
