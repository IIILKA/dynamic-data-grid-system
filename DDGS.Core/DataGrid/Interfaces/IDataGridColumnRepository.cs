using DDGS.Core.DataGrid.Models;
using FluentResults;

namespace DDGS.Core.DataGrid.Interfaces
{
    public interface IDataGridColumnRepository
    {
        Task<DataGridColumnEntity?> GetAsync(Guid id);

        Task<DataGridColumnEntity?> GetByDataGridAndNameAsync(Guid dataGridId, string name);

        Task<List<DataGridColumnEntity>> GetByDataGridAsync(Guid dataGridId);

        Task<List<DataGridColumnEntity>> GetAllAsync();

        Task<Result> CreateAsync(DataGridColumnEntity entity);

        Task<Result> DeleteAsync(Guid id);
    }
}
