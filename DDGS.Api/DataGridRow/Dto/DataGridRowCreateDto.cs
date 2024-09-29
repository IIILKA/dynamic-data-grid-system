using System.ComponentModel.DataAnnotations;

namespace DDGS.Api.DataGridRow.Dto
{
    public record DataGridRowCreateDto
    {
        [Required]
        public int Index { get; init; }

        [Required]
        public required Dictionary<string, object> RowData { get; init; }
    }
}
