using DDGS.Api.TestFeature.Dto;
using DDGS.Core.TestFeature.Interfaces;
using DDGS.Core.TestFeature.Payloads;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace DDGS.Api.TestFeature
{
    [Route("api/test")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;

        private readonly IMapper _mapper;

        public TestController(ITestService testService, IMapper mapper)
        {
            _testService = testService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            var entityList = await _testService.GetManyAsync();

            var dtoList = _mapper.Map<List<TestIndexDto>>(entityList);

            return Ok(dtoList);
        }

        [HttpGet("{testId}")]
        public async Task<IActionResult> GetAsync(Guid testId)
        {
            var dto = _mapper.Map<TestDetailsDto>((await _testService.GetAsync(testId))!);

            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] TestCreateDto dto)
        {
            var payload = _mapper.Map<TestCreatePayload>(dto);

            var entity = await _testService.CreateAsync(payload);

            return Ok(entity.Id);
        }

        //TODO: use patch
        [HttpPut("{testId}")]
        public async Task<IActionResult> PutAsync(Guid testId, [FromBody] TestEditDto dto)
        {
            var payload = _mapper.Map<TestEditPayload>(dto);

            await _testService.UpdateAsync(testId, payload);

            return Ok();
        }

        [HttpDelete("{testId}")]
        public async Task<IActionResult> DeleteAsync(Guid testId)
        {
            await _testService.DeleteAsync(testId);

            return Ok();
        }
    }
}
