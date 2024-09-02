namespace DDGS.Core.DataGridRow.Errors
{
    public class DataGridRowInvalidValueError : FluentResults.Error
    {
        public DataGridRowInvalidValueError(string invalidValueElementName)
        {
            InvalidValueElementName = invalidValueElementName;
        }

        public string InvalidValueElementName { get; init; }
    }
}
