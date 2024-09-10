using System.ComponentModel.DataAnnotations;

namespace DDGS.Api.DataGridRow.Dto
{
    public record DataGridRowUpdateDto
    {
        [Required]
        public required Dictionary<string, object> RowData { get; init; }
    }
}
