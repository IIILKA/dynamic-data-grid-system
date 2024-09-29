using FluentResults;

namespace DDGS.Core.DataGridRow.Errors
{
    public class DataGridRowInvalidElementError : Error
    {
        public DataGridRowInvalidElementError(string invalidElementName)
        {
            InvalidElementName = invalidElementName;
        }

        public string InvalidElementName { get; init; }
    }
}
