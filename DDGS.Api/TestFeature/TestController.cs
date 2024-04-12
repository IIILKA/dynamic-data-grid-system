using DDGS.Api.TestFeature.Dto;
using DDGS.Core.TestFeature.Interfaces;
using DDGS.Core.TestFeature.Payloads;
using Microsoft.AspNetCore.Mvc;

namespace DDGS.Api.TestFeature
{
    [Route("api/test")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ITestService _testService;

        public TestController(ITestService testService)
        {
            _testService = testService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAsync()
        {
            return Ok((await _testService.GetManyAsync()).Select(_ => new TestIndexDto { Id =_.Id, Name = _.Name }));
        }

        [HttpGet("{testId}")]
        public async Task<IActionResult> GetAsync(Guid testId)
        {
            var entity = await _testService.GetAsync(testId);

            return Ok(entity != null ? new TestDetailsDto { Id = entity.Id, Name = entity.Name } : null);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] TestCreateDto dto)
        {
            var entity = await _testService.CreateAsync(new TestCreatePayload(dto.Name));

            return Ok(entity.Id);
        }

        [HttpPut("{testId}")]
        public async Task<IActionResult> Put(Guid testId, [FromBody] TestEditDto dto)
        {
            await _testService.UpdateAsync(new TestEditPayload(testId, dto.Name ));

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
