using FluentResults;

namespace DDGS.Core.DataGridRow.Errors
{
    public class DataGridRowInvalidValueError : Error
    {
        public DataGridRowInvalidValueError(string invalidValueElementName)
        {
            InvalidValueElementName = invalidValueElementName;
        }

        public string InvalidValueElementName { get; init; }
    }
}
