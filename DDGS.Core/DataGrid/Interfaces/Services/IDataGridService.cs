using DDGS.Core.DataGrid.Models;
using DDGS.Core.DataGrid.Models.Payloads;
using DDGS.Core.Identity.Models;
using FluentResults;

namespace DDGS.Core.DataGrid.Interfaces.Services
{
    public interface IDataGridService
    {
        Task<DataGridEntity?> GetAsync(Guid id);

        Task<List<DataGridEntity>> GetByUserAsync(UserEntity userEntity);

        Task<List<DataGridEntity>> GetAllAsync();

        Task<Result> CreateAsync(DatGridCreatePayload payload);

        Task<Result> AddColumnAsync(Guid dataGridId, DataGridColumnCreatePayload payload);

        Task<Result> RemoveColumnAsync(Guid id, string columnName);

        Task<Result> RenameAsync(Guid id, DataGridRenamePayload payload);

        Task<Result> DeleteAsync(Guid id);
    }
}
