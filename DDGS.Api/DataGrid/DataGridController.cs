using DDGS.Api.Core;
using DDGS.Api.DataGrid.Dto;
using DDGS.Api.Utils;
using DDGS.Core.DataGrid.Interfaces;
using DDGS.Core.DataGrid.Models;
using MapsterMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DDGS.Api.DataGrid
{
    [Route("data-grid")]
    [ApiController]
    //[Authorize]
    public class DataGridController : ControllerBase
    {
        private readonly IDataGridService _dataGridService;
        private readonly IMapper _mapper;

        public DataGridController(IDataGridService dataGridService, IMapper mapper)
        {
            _dataGridService = dataGridService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var dataGrids = await _dataGridService.GetAllAsync();

            var dataGridDtos = _mapper.Map<List<DataGridIndexDto>>(dataGrids);

            return Ok(dataGridDtos);
        }

        [HttpGet("{dataGridId}")]
        public async Task<IActionResult> GetAsync(Guid dataGridId)
        {
            var dataGrid = await _dataGridService.GetAsync(dataGridId);

            if (dataGrid == null)
            {
                return BadRequest(new ErrorResponseDto("Data grid not found"));
            }

            var dataGridDto = _mapper.Map<DataGridDetailsDto>(dataGrid);

            return Ok(dataGridDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateDataGridAsync([FromBody] DataGridCreateDto dto)
        {
            var payload = _mapper.Map<DatGridCreatePayload>(dto);

            var result = await _dataGridService.CreateAsync(payload);

            if (result.IsFailed)
            {
                return BadRequest(result.ToErrorResponseDto());
            }

            return Ok();
        }

        [HttpPatch("rename/{dataGridId}")]
        public async Task<IActionResult> RenameDataGridAsync(Guid dataGridId, [FromBody] DataGridRenameDto dto)
        {
            var payload = _mapper.Map<DataGridRenamePayload>(dto);

            var result = await _dataGridService.RenameAsync(dataGridId, payload);

            if (result.IsFailed)
            {
                return BadRequest(result.ToErrorResponseDto());
            }

            return Ok();
        }

        [HttpPatch("add-col/{dataGridId}")]
        public async Task<IActionResult> AddColumnAsync(Guid dataGridId, [FromBody] DataGridAddColumnDto dto)
        {
            var payload = _mapper.Map<DataGridColumnCreatePayload>(dto);

            var result = await _dataGridService.AddColumnAsync(dataGridId, payload);

            if (result.IsFailed)
            {
                return BadRequest(result.ToErrorResponseDto());
            }

            return Ok();
        }

        [HttpPatch("remove-col/{dataGridId}/{colName}")]
        public async Task<IActionResult> RemoveColumnAsync(Guid dataGridId, string colName)
        {
            var result = await _dataGridService.RemoveColumnAsync(dataGridId, colName);

            if (result.IsFailed)
            {
                return BadRequest(result.ToErrorResponseDto());
            }

            return Ok();
        }

        [HttpDelete("{dataGridId}")]
        public async Task<IActionResult> DeleteAsync(Guid dataGridId)
        {
            await _dataGridService.DeleteAsync(dataGridId);

            return Ok();
        }
    }
}
