using DDGS.Api.Core;
using DDGS.Api.DataGrid.Dto;
using DDGS.Api.Error;
using DDGS.Api.Error.Dto;
using DDGS.Core.DataGrid.Interfaces.Services;
using DDGS.Core.DataGrid.Models.Payloads;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace DDGS.Api.DataGrid
{
    [Route("data-grid")]
    //[Authorize]
    public class DataGridController : DdgsControllerBase
    {
        private readonly IDataGridService _dataGridService;

        public DataGridController(IDataGridService dataGridService, IMapper mapper)
            : base(mapper)
        {
            _dataGridService = dataGridService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var dataGrids = await _dataGridService.GetAllAsync();

            var dataGridDtos = Mapper.Map<List<DataGridIndexDto>>(dataGrids);

            return Ok(dataGridDtos);
        }

        [HttpGet("{dataGridId}")]
        public async Task<IActionResult> GetAsync(Guid dataGridId)
        {
            var dataGrid = await _dataGridService.GetAsync(dataGridId);

            if (dataGrid == null)
            {
                return BadRequest(new ErrorResponseDto(ErrorMessages.DataGrid.NotExist));
            }

            var dataGridDto = Mapper.Map<DataGridDetailsDto>(dataGrid);

            return Ok(dataGridDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDataGridAsync([FromBody] DataGridCreateDto dto)
        {
            var payload = Mapper.Map<DatGridCreatePayload>(dto);

            var result = await _dataGridService.CreateAsync(payload);

            return HandleResult(result);
        }

        [HttpPatch("{dataGridId}/rename")]
        public async Task<IActionResult> RenameDataGridAsync(Guid dataGridId, [FromBody] DataGridRenameDto dto)
        {
            var payload = Mapper.Map<DataGridRenamePayload>(dto);

            var result = await _dataGridService.RenameAsync(dataGridId, payload);

            return HandleResult(result);
        }

        [HttpPatch("{dataGridId}/add-col")]
        public async Task<IActionResult> AddColumnAsync(Guid dataGridId, [FromBody] DataGridAddColumnDto dto)
        {
            var payload = Mapper.Map<DataGridColumnCreatePayload>(dto);

            var result = await _dataGridService.AddColumnAsync(dataGridId, payload);

            return HandleResult(result);
        }

        [HttpPatch("{dataGridId}/remove-col/{colName}")]
        public async Task<IActionResult> RemoveColumnAsync(Guid dataGridId, string colName)
        {
            var result = await _dataGridService.RemoveColumnAsync(dataGridId, colName);

            return HandleResult(result);
        }

        [HttpDelete("{dataGridId}")]
        public async Task<IActionResult> DeleteAsync(Guid dataGridId)
        {
            var result = await _dataGridService.DeleteAsync(dataGridId);

            return HandleResult(result);
        }
    }
}
