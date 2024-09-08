using DDGS.Api.Error.Maps;
using DDGS.Core.Identity.Error;
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
                if (result.Errors.Any(resultError => resultError.GetType() == typeof(UserUnauthorizedError)))
                {
                    return Unauthorized();
                }

                return BadRequest(ErrorMapper.MapErrorsToErrorResponseDto(result));
            }

            return Ok();
        }

        protected IActionResult HandleResult<T>(Result<T> result)
        {
            if (result.IsFailed)
            {
                if (result.Errors.Any(resultError => resultError.GetType() == typeof(UserUnauthorizedError)))
                {
                    return Unauthorized();
                }

                return BadRequest(ErrorMapper.MapErrorsToErrorResponseDto(result));
            }

            return Ok(result.Value);
        }
    }
}
