namespace DDGS.Core.Test.Interfaces
{
    public interface ITestService
    {
        Task<List<Test>> GetManyAsync();

        Task<Test> GetAsync(Guid id);

        Task<Test> CreateAsync(Test entity);

        Task<Test> UpdateAsync(Test entity);

        Task DeleteAsync(Guid id);
    }
}
