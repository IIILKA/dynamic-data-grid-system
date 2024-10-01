using DDGS.Core.DataGridRow.Models;
using DDGS.Core.DataGridRow.Models.Payloads;
using FluentResults;

namespace DDGS.Core.DataGridRow.Interfaces.Services
{
    public interface IDataGridRowService
    {
        Task<Result<DataGridRowEntity?>> GetAsync(Guid dataGridId, string rowId);

        Task<Result<List<DataGridRowEntity>>> GetByDataGridAsync(Guid dataGridId);

        Task<Result> CreateAsync(Guid dataGridId, DataGridRowCreatePayload payload);

        Task<Result> UpdateRowAsync(Guid dataGridId, string rowId, DataGridRowUpdatePayload payload);

        Task<Result> DeleteAsync(Guid dataGridId, string rowId);
    }
}
