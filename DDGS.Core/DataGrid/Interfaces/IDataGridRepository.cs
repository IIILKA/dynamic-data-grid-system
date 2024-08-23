using DDGS.Core.DataGrid.Models;
using FluentResults;

namespace DDGS.Core.DataGrid.Interfaces
{
    public interface IDataGridRepository
    {
        Task<DataGridEntity?> GetAsync(Guid id);

        Task<List<DataGridEntity>> GetByUserAsync(Guid userId);

        Task<List<DataGridEntity>> GetAllAsync();

        Task<Result> CreateAsync(DataGridEntity entity);

        Task<Result> UpdateAsync(DataGridEntity entity);

        Task<Result> DeleteAsync(Guid id);
    }
}
