using DDGS.Api.Error.Dto;
using DDGS.Core.DataGrid.Errors;
using DDGS.Core.DataGridRow.Errors;
using FluentResults;

namespace DDGS.Api.Error.Maps
{
    public static class ErrorMapper
    {
        public static ErrorResponseDto MapErrorsToErrorResponseDto(Result originalResult)
        {
            var mappedErrors = originalResult.Errors
                .Select(MapError)
                .Select(mappedError => mappedError.Message)
                .ToArray();

            return new ErrorResponseDto(mappedErrors);
        }

        public static ErrorResponseDto MapErrorsToErrorResponseDto<T>(Result<T> originalResult)
        {
            var mappedErrors = originalResult.Errors
                .Select(MapError)
                .Select(mappedError => mappedError.Message)
                .ToArray();

            return new ErrorResponseDto(mappedErrors);
        }

        private static IError MapError(IError error)
        {
            switch (error)
            {
                case DataGridNotExistError _:
                    return new FluentResults.Error(ErrorMessages.DataGrid.NotExist);
                case DataGridColumnNotExistError _:
                    return new FluentResults.Error(ErrorMessages.DataGridColumn.NotExist);
                case DataGridRowNotExistError _:
                    return new FluentResults.Error(ErrorMessages.DataGridRow.NotExist);
                case DataGridRowInvalidStructureError _:
                    return new FluentResults.Error(ErrorMessages.DataGridRow.InvalidStructure);
                case DataGridRowInvalidValueError dataGridRowInvalidValueError:
                    return new FluentResults.Error(string.Format(ErrorMessages.DataGridRow.InvalidValue, dataGridRowInvalidValueError.InvalidValueElementName));
                case FluentResults.Error when !string.IsNullOrEmpty(error.Message):
                    return error;
                default:
                    return new FluentResults.Error(ErrorMessages.General.Unknown);
            }
        }
    }
}
