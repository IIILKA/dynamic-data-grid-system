using DDGS.Core.Test.Interfaces;

namespace DDGS.Core.Test
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

        public async Task<Test> GetAsync(Guid id)
        {
            return await _testRepository.GetAsync(id);
        }

        public async Task<Test> CreateAsync(Test entity)
        {
            return await _testRepository.CreateAsync(entity);
        }

        public async Task<Test> UpdateAsync(Test entity)
        {
            return await _testRepository.UpdateAsync(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _testRepository.DeleteAsync(id);
        }
    }
}
