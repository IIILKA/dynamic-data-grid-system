using DDGS.Core.DataGrid.Models;

namespace DDGS.Api.DataGrid.Dto
{
    public record DataGridColumnDto(
        int Index,
        string Name,
        DataGridColumnType Type);
}
