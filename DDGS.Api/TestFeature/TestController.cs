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
            var dtoList = _mapper.Map<List<TestIndexDto>>(await _testService.GetManyAsync());

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
            var entity = await _testService.CreateAsync(_mapper.Map<TestCreatePayload>(dto));

            return Ok(entity.Id);
        }

        [HttpPut("{testId}")]
        public async Task<IActionResult> Put(Guid testId, [FromBody] TestEditDto dto)
        {
            await _testService.UpdateAsync(testId, _mapper.Map<TestEditPayload>(dto));

            return Ok();
        }

        [HttpDelete("{testId}")]
        public async Task<IActionResult> Delete(Guid testId)
        {
            await _testService.DeleteAsync(testId);

            return Ok();
        }
    }
}
