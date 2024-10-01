using System.ComponentModel.DataAnnotations;
using DDGS.Core.DataGrid.Models.Constraints;

namespace DDGS.Api.DataGrid.Dto
{
    public record DataGridCreateDto
    {
        [Required]
        [MinLength(DataGridConstraints.NameMinLength)]
        [MaxLength(DataGridConstraints.NameMaxLength)]
        public required string Name { get; init; }
    }
}
