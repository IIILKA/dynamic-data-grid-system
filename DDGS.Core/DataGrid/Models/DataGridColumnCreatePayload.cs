namespace DDGS.Core.DataGrid.Models
{
    public record DataGridColumnCreatePayload(
        string Name,
        DataGridColumnType Type,
        int Index);
}
