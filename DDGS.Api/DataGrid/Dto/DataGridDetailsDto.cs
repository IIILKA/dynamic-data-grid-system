namespace DDGS.Api.DataGrid.Dto
{
    public record DataGridDetailsDto(
        Guid Id,
        string Name,
        string OwnerUsername,
        DateTimeOffset DateCreated,
        List<DataGridColumnDto> Columns);
}
