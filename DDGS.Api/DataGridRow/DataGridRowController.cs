using DDGS.Api.Core;
using DDGS.Api.DataGridRow.Dto;
using DDGS.Api.Error;
using DDGS.Api.Error.Dto;
using DDGS.Api.Error.Maps;
using DDGS.Core.DataGridRow.Interfaces.Services;
using DDGS.Core.DataGridRow.Models.Payloads;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace DDGS.Api.DataGridRow
{
    [Route("data-grid/{dataGridId}/row")]
    //[Authorize]
    public class DataGridRowController : DdgsControllerBase
    {
        private readonly IDataGridRowService _dataGridRowService;

        [FromRoute(Name = "dataGridId")]
        public Guid DataGridId { get; set; }

        public DataGridRowController(IDataGridRowService dataGridRowService, IMapper mapper)
            : base(mapper)
        {
            _dataGridRowService = dataGridRowService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var result = await _dataGridRowService.GetByDataGridAsync(DataGridId);
            if (result.IsFailed)
            {
                return BadRequest(ErrorMapper.MapErrorsToErrorResponseDto(result));
            }

            var rows = result.Value.Select(_ => _.Elements).Cast<object>().ToList();

            return Ok(rows);
        }

        [HttpGet("{rowId}")]
        public async Task<IActionResult> GetAsync(string rowId)
        {
            var result = await _dataGridRowService.GetAsync(DataGridId, rowId);
            if (result.IsFailed)
            {
                return BadRequest(ErrorMapper.MapErrorsToErrorResponseDto(result));
            }

            if (result.Value == null)
            {
                return BadRequest(new ErrorResponseDto(ErrorMessages.DataGridRow.NotExist));
            }

            return Ok(result.Value?.Elements);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] DataGridRowCreateDto dto)
        {
            var result =
                await _dataGridRowService.CreateAsync(DataGridId, Mapper.Map<DataGridRowCreatePayload>(dto));

            return HandleResult(result);
        }

        [HttpPut("{rowId}")]
        public async Task<IActionResult> UpdateAsync(string rowId, [FromBody] DataGridRowUpdateDto dto)
        {
            var result =
                await _dataGridRowService.UpdateRowAsync(DataGridId, rowId, Mapper.Map<DataGridRowUpdatePayload>(dto));

            return HandleResult(result);
        }

        [HttpDelete("{rowId}")]
        public async Task<IActionResult> DeleteAsync(string rowId)
        {
            var result = await _dataGridRowService.DeleteAsync(DataGridId, rowId);

            return HandleResult(result);
        }
    }
}
