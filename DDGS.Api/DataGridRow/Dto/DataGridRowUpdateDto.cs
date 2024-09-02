using System.ComponentModel.DataAnnotations;

namespace DDGS.Api.DataGridRow.Dto
{
    public record DataGridRowUpdateDto
    {
        [Required]
        public required string JsonRow { get; init; }
    }
}
