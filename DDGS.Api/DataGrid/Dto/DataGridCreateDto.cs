using System.ComponentModel.DataAnnotations;
using DDGS.Core.DataGrid.Models;

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
