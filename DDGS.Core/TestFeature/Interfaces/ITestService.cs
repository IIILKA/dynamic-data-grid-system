using DDGS.Core.TestFeature.Payloads;

namespace DDGS.Core.TestFeature.Interfaces
{
    public interface ITestService
    {
        Task<List<Test>> GetManyAsync();

        Task<Test?> GetAsync(Guid id);

        Task<Test> CreateAsync(TestCreatePayload payload);

        Task<Test?> UpdateAsync(TestEditPayload payload);

        Task DeleteAsync(Guid id);
    }
}
