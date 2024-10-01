using DDGS.Core.DataGrid.Models;
using FluentResults;

namespace DDGS.Core.DataGrid.Interfaces.Repositories
{
    public interface IDataGridRepository
    {
        Task<DataGridEntity?> GetAsync(Guid id);

        Task<List<DataGridEntity>> GetManyByUserAsync(Guid userId);

        Task<List<DataGridEntity>> GetAllAsync();

        Task<Result> CreateAsync(DataGridEntity entity);

        Task<Result> UpdateAsync(DataGridEntity entity);

        Task<Result> DeleteAsync(DataGridEntity entity);
    }
}
