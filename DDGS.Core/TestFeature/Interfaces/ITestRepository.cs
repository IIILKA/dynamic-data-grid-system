namespace DDGS.Core.TestFeature.Interfaces
{
    public interface ITestRepository
    {
        Task<List<Test>> GetManyAsync();

        Task<Test?> GetAsync(Guid id);

        Task<Test> CreateAsync(Test entity);

        Task<Test?> UpdateAsync(Test entity);

        Task DeleteAsync(Guid id);
    }
}
