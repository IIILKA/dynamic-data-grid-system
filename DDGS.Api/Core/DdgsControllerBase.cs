using DDGS.Api.Error.Maps;
using FluentResults;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace DDGS.Api.Core
{
    [ApiController]
    public class DdgsControllerBase : ControllerBase
    {
        protected readonly IMapper Mapper;

        protected DdgsControllerBase(IMapper mapper)
        {
            Mapper = mapper;
        }

        protected IActionResult HandleResult(Result result)
        {
            if (result.IsFailed)
            {
                return BadRequest(ErrorMapper.MapErrorsToErrorResponseDto(result));
            }

            return Ok();
        }

        protected IActionResult HandleResult<T>(Result<T> result)
        {
            if (result.IsFailed)
            {
                return BadRequest(ErrorMapper.MapErrorsToErrorResponseDto(result));
            }

            return Ok(result.Value);
        }
    }
}
