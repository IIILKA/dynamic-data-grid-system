using DDGS.Core.DataGrid.Models;
using DDGS.Core.DataGridRow.Models;
using FluentResults;

namespace DDGS.Core.DataGridRow.Interfaces.Repositories
{
    public interface IDataGridRowRepository
    {
        Task<DataGridRowEntity?> GetAsync(DataGridEntity dataGrid, string rowId);

        Task<List<DataGridRowEntity>> GetByDataGridAsync(DataGridEntity dataGrid);

        Task<Result> CreateAsync(DataGridEntity dataGrid, DataGridRowEntity dataGridRow);

        //TODO: maybe remove rowId
        Task<Result> UpdateAsync(DataGridEntity dataGrid, string rowId, DataGridRowEntity partialDataGridRow);

        Task<Result> IncrementIndexesAfterRowAsync(DataGridEntity dataGrid, int index);

        Task<Result> DecrementIndexesAfterRowAsync(DataGridEntity dataGrid, int index);

        Task<Result> DeleteAsync(DataGridEntity dataGrid, string rowId);
    }
}
