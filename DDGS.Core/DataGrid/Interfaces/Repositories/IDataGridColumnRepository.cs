using DDGS.Core.DataGrid.Models;
using FluentResults;

namespace DDGS.Core.DataGrid.Interfaces.Repositories
{
    public interface IDataGridColumnRepository
    {
        Task<DataGridColumnEntity?> GetByDataGridAndNameAsync(DataGridEntity dataGrid, string name);

        Task<Result> CreateAsync(DataGridColumnEntity entity);

        Task<Result> DeleteAsync(DataGridColumnEntity entity);
    }
}
