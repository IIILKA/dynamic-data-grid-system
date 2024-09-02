using System.ComponentModel.DataAnnotations;

namespace DDGS.Api.DataGridRow.Dto
{
    public record DataGridRowCreateDto
    {
        [Required]
        public required string JsonRow { get; init; }
    }
}
