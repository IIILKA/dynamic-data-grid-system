using System.Text.Json;
using DDGS.Core.DataGrid.Errors;
using DDGS.Core.DataGrid.Interfaces.Repositories;
using DDGS.Core.DataGrid.Models;
using DDGS.Core.DataGridRow.Errors;
using DDGS.Core.DataGridRow.Interfaces.Repositories;
using DDGS.Core.DataGridRow.Interfaces.Services;
using DDGS.Core.DataGridRow.Models;
using DDGS.Core.DataGridRow.Models.Payloads;
using FluentResults;
using MapsterMapper;

namespace DDGS.Core.DataGridRow
{
    public class DataGridRowService : IDataGridRowService
    {
        private readonly IDataGridRepository _dataGridRepository;
        private readonly IDataGridRowRepository _dataGridRowRepository;
        private readonly IMapper _mapper;

        public DataGridRowService(
            IDataGridRepository dataGridRepository,
            IDataGridRowRepository dataGridRowRepository,
            IMapper mapper)
        {
            _dataGridRepository = dataGridRepository;
            _dataGridRowRepository = dataGridRowRepository;
            _mapper = mapper;
        }

        public async Task<Result<DataGridRowEntity?>> GetAsync(Guid dataGridId, string rowId)
        {
            return await ExecuteWithDataGridAsync(dataGridId, async dataGrid =>
                Result.Ok(await _dataGridRowRepository.GetAsync(dataGrid, rowId)));
        }

        public async Task<Result<List<DataGridRowEntity>>> GetByDataGridAsync(Guid dataGridId)
        {
            return await ExecuteWithDataGridAsync(dataGridId, async dataGrid =>
                Result.Ok(await _dataGridRowRepository.GetByDataGridAsync(dataGrid)));
        }

        public async Task<Result> CreateAsync(Guid dataGridId, DataGridRowCreatePayload payload)
        {
            return await ExecuteWithDataGridAsync(dataGridId, async dataGrid =>
            {
                var dataGridRow = _mapper.Map<DataGridRowEntity>(payload);

                var validationResult = ValidateRow(dataGrid, dataGridRow);
                if (validationResult.IsFailed)
                {
                    return validationResult;
                }

                return await _dataGridRowRepository.CreateAsync(dataGrid, dataGridRow);
            });
        }

        public async Task<Result> UpdateRowAsync(Guid dataGridId, string rowId, DataGridRowUpdatePayload payload)
        {
            return await ExecuteWithDataGridAsync(dataGridId, async dataGrid =>
            {
                var row = await _dataGridRowRepository.GetAsync(dataGrid, rowId);

                if (row == null)
                {
                    return Result.Fail(new DataGridRowNotExistError());
                }

                var dataGridRow = _mapper.Map<DataGridRowEntity>(payload);

                var validationResult = ValidateRow(dataGrid, dataGridRow);
                if (validationResult.IsFailed)
                {
                    return validationResult;
                }

                return await _dataGridRowRepository.UpdateAsync(dataGrid, rowId, dataGridRow);
            });
        }

        public async Task<Result> DeleteAsync(Guid dataGridId, string rowId)
        {
            return await ExecuteWithDataGridAsync(dataGridId, async dataGrid =>
            {
                var row = await _dataGridRowRepository.GetAsync(dataGrid, rowId);

                if (row == null)
                {
                    return Result.Fail(new DataGridRowNotExistError());
                }

                return await _dataGridRowRepository.DeleteAsync(dataGrid, rowId);
            });
        }

        private async Task<Result> ExecuteWithDataGridAsync(Guid dataGridId, Func<DataGridEntity, Task<Result>> action)
        {
            var dataGrid = await _dataGridRepository.GetAsync(dataGridId);

            if (dataGrid == null)
            {
                return Result.Fail(new DataGridNotExistError());
            }

            return await action(dataGrid);
        }

        private async Task<Result<T>> ExecuteWithDataGridAsync<T>(Guid dataGridId, Func<DataGridEntity, Task<Result<T>>> action)
        {
            var dataGrid = await _dataGridRepository.GetAsync(dataGridId);

            if (dataGrid == null)
            {
                return Result.Fail<T>(new DataGridNotExistError());
            }

            return await action(dataGrid);
        }

        private Result ValidateRow(DataGridEntity dataGrid, DataGridRowEntity row)
        {
            if (row.Elements.Count > dataGrid.Columns.Count)
            {
                return Result.Fail(new DataGridRowInvalidStructureError());
            }

            foreach (var column in dataGrid.Columns)
            {
                if (!row.Elements.ContainsKey(column.Name.ToLower()))
                {
                    return Result.Fail(new DataGridRowInvalidStructureError());
                }

                var value = row.Elements[column.Name.ToLower()];
                var jsonElement = (JsonElement)value;
                var isValid = column.Type switch
                {
                    DataGridColumnType.Text when jsonElement.ValueKind is JsonValueKind.String => true,
                    DataGridColumnType.Number when jsonElement.ValueKind is JsonValueKind.Number => true,
                    DataGridColumnType.Boolean when jsonElement.ValueKind is JsonValueKind.True or JsonValueKind.False => true,
                    _ => false
                };

                if (!isValid)
                {
                    return Result.Fail(new DataGridRowInvalidValueError(column.Name));
                }
            }

            return Result.Ok();
        }
    }
}
