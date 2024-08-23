using DDGS.Core.DataGrid.Models;
using DDGS.Core.Identity.Entities;
using FluentResults;

namespace DDGS.Core.DataGrid.Interfaces
{
    public interface IDataGridService
    {
        Task<DataGridEntity?> GetAsync(Guid id);

        Task<List<DataGridEntity>> GetByUserAsync(User user);

        Task<List<DataGridEntity>> GetAllAsync();

        Task<Result> CreateAsync(DatGridCreatePayload payload);

        Task<Result> AddColumnAsync(Guid id, DataGridColumnCreatePayload payload);

        Task<Result> RemoveColumnAsync(Guid id, string columnName);

        Task<Result> RenameAsync(Guid id, DataGridRenamePayload payload);

        Task<Result> DeleteAsync(Guid id);
    }
}
