namespace DDGS.Core.DataGridRow.Models
{
    public class DataGridRowEntity
    {
        public required string Id { get; set; }

        public required IDictionary<string, object> RowData { get; set; }
    }
}
