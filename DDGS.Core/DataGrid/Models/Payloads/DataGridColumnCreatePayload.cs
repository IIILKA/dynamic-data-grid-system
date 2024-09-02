namespace DDGS.Core.DataGrid.Models.Payloads
{
    public record DataGridColumnCreatePayload(
        string Name,
        DataGridColumnType Type,
        int Index);
}
