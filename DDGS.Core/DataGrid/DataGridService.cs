using DDGS.Core.DataGrid.Interfaces;
using DDGS.Core.DataGrid.Models;
using DDGS.Core.Identity.Entities;
using DDGS.Core.Identity.Interfaces;
using FluentResults;
using MapsterMapper;

namespace DDGS.Core.DataGrid
{
    public class DataGridService : IDataGridService
    {
        private readonly IDataGridRepository _dataGridRepository;
        private readonly IDataGridColumnRepository _dataGridColumnRepository;
        private readonly IUserContextService _userContextService;
        private readonly IMapper _mapper;

        public DataGridService(
            IDataGridRepository dataGridRepository,
            IDataGridColumnRepository dataGridColumnRepository,
            IUserContextService userContextService,
            IMapper mapper)
        {
            _dataGridRepository = dataGridRepository;
            _dataGridColumnRepository = dataGridColumnRepository;
            _userContextService = userContextService;
            _mapper = mapper;
        }

        public async Task<DataGridEntity?> GetAsync(Guid id)
        {
            return await _dataGridRepository.GetAsync(id);
        }

        public async Task<List<DataGridEntity>> GetByUserAsync(User user)
        {
            return await _dataGridRepository.GetByUserAsync(user.Id);
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

            return await _dataGridRepository.CreateAsync(dataGrid);
        }

        public async Task<Result> AddColumnAsync(Guid id, DataGridColumnCreatePayload payload)
        {
            var dataGrid = await _dataGridRepository.GetAsync(id);
            //var dataGrid = new DataGridEntity { Id = id };

            if (dataGrid == null)
            {
                return Result.Fail("Data grid does not exist");
            }

            var dataGridColumn = _mapper.Map<DataGridColumnEntity>(payload);
            dataGridColumn.DataGrid = dataGrid;

            return await _dataGridColumnRepository.CreateAsync(dataGridColumn);
        }

        public async Task<Result> RemoveColumnAsync(Guid dataGridId, string columnName)
        {
            var dataGridColumn = await _dataGridColumnRepository.GetByDataGridAndNameAsync(dataGridId, columnName);

            if (dataGridColumn == null)
            {
                return Result.Fail("Data grid column does not exist");
            }

            return await _dataGridColumnRepository.DeleteAsync(dataGridColumn.Id);
        }

        public async Task<Result> RenameAsync(Guid id, DataGridRenamePayload payload)
        {
            var dataGrid = await _dataGridRepository.GetAsync(id);

            if (dataGrid == null)
            {
                return Result.Fail("Data grid does not exist");
            }

            dataGrid.Name = payload.Name;

            return await _dataGridRepository.UpdateAsync(dataGrid);
        }

        public async Task<Result> DeleteAsync(Guid id)
        {
            return await _dataGridRepository.DeleteAsync(id);
        }

        private List<DataGridColumnEntity> GetDefaultColumns(DataGridEntity dataGrid)
        {
            return new List<DataGridColumnEntity>
            {
                new DataGridColumnEntity
                {
                    Id = Guid.Empty,
                    Name = "Name",
                    Type = DataGridColumnType.Text,
                    Index = DataGridColumnConstraints.IndexMinValue,
                    DataGrid = dataGrid
                },
                new DataGridColumnEntity
                {
                    Id = Guid.Empty,
                    Name = "Age",
                    Type = DataGridColumnType.Number,
                    Index = DataGridColumnConstraints.IndexMinValue + 1,
                    DataGrid = dataGrid
                },
                new DataGridColumnEntity
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
