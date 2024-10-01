using DDGS.Core.DataGrid.Models;
using FluentResults;

namespace DDGS.Core.DataGrid.Interfaces.Repositories
{
    public interface IDataGridCollectionRepository
    {
        Task<Result> CreateAsync(DataGridEntity dataGrid);

        Task<Result> DeleteAsync(DataGridEntity dataGrid);

        Task<Result> AddElementToAllDocumentsInCollectionAsync(DataGridEntity dataGrid, DataGridColumnEntity dataGridColumn);

        Task<Result> RemoveElementFromAllDocumentsInCollectionAsync(DataGridEntity dataGrid, DataGridColumnEntity dataGridColumn);
    }
}
