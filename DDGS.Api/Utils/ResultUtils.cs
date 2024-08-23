using DDGS.Api.Core;
using FluentResults;

namespace DDGS.Api.Utils
{
    public static class ResultUtils
    {
        public static ErrorResponseDto ToErrorResponseDto(this Result result)
        {
            return new ErrorResponseDto(result.Errors.Select(_ => _.Message).ToArray());
        }

        public static ErrorResponseDto ToErrorResponseDto<T>(this Result<T> result)
        {
            return new ErrorResponseDto(result.Errors.Select(_ => _.Message).ToArray());
        }
    }
}
