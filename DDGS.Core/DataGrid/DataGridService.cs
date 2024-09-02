using DDGS.Core.Core;
using DDGS.Core.Core.Interfaces;
using DDGS.Core.DataGrid.Errors;
using DDGS.Core.DataGrid.Interfaces.Repositories;
using DDGS.Core.DataGrid.Interfaces.Services;
using DDGS.Core.DataGrid.Models;
using DDGS.Core.DataGrid.Models.Constraints;
using DDGS.Core.DataGrid.Models.Payloads;
using DDGS.Core.Identity.Interfaces;
using DDGS.Core.Identity.Models;
using FluentResults;
using MapsterMapper;

namespace DDGS.Core.DataGrid
{
    public class DataGridService : ServiceBase, IDataGridService
    {
        private readonly IDataGridRepository _dataGridRepository;
        private readonly IDataGridColumnRepository _dataGridColumnRepository;
        private readonly IDataGridCollectionRepository _dataGridCollectionRepository;
        private readonly IUserContextService _userContextService;

        public DataGridService(
            IDataGridRepository dataGridRepository,
            IDataGridColumnRepository dataGridColumnRepository,
            IDataGridCollectionRepository dataGridCollectionRepository,
            IUserContextService userContextService,
            IUnitOfWork unitOfWork,
            IMapper mapper) : base(unitOfWork, mapper)
        {
            _dataGridRepository = dataGridRepository;
            _dataGridColumnRepository = dataGridColumnRepository;
            _dataGridCollectionRepository = dataGridCollectionRepository;
            _userContextService = userContextService;
        }

        public async Task<DataGridEntity?> GetAsync(Guid id)
        {
            return await _dataGridRepository.GetAsync(id);
        }

        public async Task<List<DataGridEntity>> GetByUserAsync(UserEntity userEntity)
        {
            return await _dataGridRepository.GetManyByUserAsync(userEntity.Id);
        }

        public async Task<List<DataGridEntity>> GetAllAsync()
        {
            return await _dataGridRepository.GetAllAsync();
        }

        public async Task<Result> CreateAsync(DatGridCreatePayload payload)
        {
            var dataGrid = new DataGridEntity
            {
                Id = Guid.Empty,
                Name = payload.Name,
                DateCreated = DateTimeOffset.Now,
                Owner = await _userContextService.GetCurrentUserAsync(),
                Columns = new List<DataGridColumnEntity>()
            };
            dataGrid.Columns = GetDefaultColumns(dataGrid);

            return await ExecuteInTransactionAsync(async () =>
            {
                var result = await _dataGridRepository.CreateAsync(dataGrid);
                if (result.IsFailed)
                {
                    return result;
                }

                return await _dataGridCollectionRepository.CreateAsync(dataGrid);
            });
        }

        public async Task<Result> AddColumnAsync(Guid dataGridId, DataGridColumnCreatePayload payload)
        {
            var dataGrid = await _dataGridRepository.GetAsync(dataGridId);

            if (dataGrid == null)
            {
                return Result.Fail(new DataGridNotExistError());
            }

            var dataGridColumn = Mapper.Map<DataGridColumnEntity>(payload);
            dataGridColumn.DataGrid = dataGrid;

            return await ExecuteInTransactionAsync(async () =>
            {
                var result = await _dataGridColumnRepository.CreateAsync(dataGridColumn);
                if (result.IsFailed)
                {
                    return result;
                }

                return await _dataGridCollectionRepository.AddElementToAllDocumentsInCollectionAsync(dataGrid, dataGridColumn);
            });
        }

        public async Task<Result> RemoveColumnAsync(Guid dataGridId, string columnName)
        {
            var dataGrid = await _dataGridRepository.GetAsync(dataGridId);

            if (dataGrid == null)
            {
                return Result.Fail(new DataGridNotExistError());
            }

            var dataGridColumn = await _dataGridColumnRepository.GetByDataGridAndNameAsync(dataGrid, columnName);

            if (dataGridColumn == null)
            {
                return Result.Fail(new DataGridColumnNotExistError());
            }

            return await ExecuteInTransactionAsync(async () =>
            {
                var result = await _dataGridColumnRepository.DeleteAsync(dataGridColumn);
                if (result.IsFailed)
                {
                    return result;
                }

                return await _dataGridCollectionRepository.RemoveElementFromAllDocumentsInCollectionAsync(dataGrid, dataGridColumn);
            });
        }

        public async Task<Result> RenameAsync(Guid id, DataGridRenamePayload payload)
        {
            var dataGrid = await _dataGridRepository.GetAsync(id);

            if (dataGrid == null)
            {
                return Result.Fail(new DataGridNotExistError());
            }

            dataGrid.Name = payload.Name;

            return await _dataGridRepository.UpdateAsync(dataGrid);
        }

        public async Task<Result> DeleteAsync(Guid id)
        {
            var dataGrid = await _dataGridRepository.GetAsync(id);

            if (dataGrid == null)
            {
                return Result.Fail(new DataGridNotExistError());
            }

            return await ExecuteInTransactionAsync(async () =>
            {
                var result = await _dataGridRepository.DeleteAsync(dataGrid);

                if (result.IsFailed)
                {
                    return result;
                }

                return await _dataGridCollectionRepository.DeleteAsync(dataGrid);
            });
        }

        private List<DataGridColumnEntity> GetDefaultColumns(DataGridEntity dataGrid)
        {
            return new List<DataGridColumnEntity>
            {
                new()
                {
                    Id = Guid.Empty,
                    Name = "Name",
                    Type = DataGridColumnType.Text,
                    Index = DataGridColumnConstraints.IndexMinValue,
                    DataGrid = dataGrid
                },
                new()
                {
                    Id = Guid.Empty,
                    Name = "Age",
                    Type = DataGridColumnType.Number,
                    Index = DataGridColumnConstraints.IndexMinValue + 1,
                    DataGrid = dataGrid
                },
                new()
                {
                    Id = Guid.Empty,
                    Name = "Done",
                    Type = DataGridColumnType.Boolean,
                    Index = DataGridColumnConstraints.IndexMinValue + 2,
                    DataGrid = dataGrid
                },
            };
        }
    }
}
