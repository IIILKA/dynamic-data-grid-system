using System.ComponentModel.DataAnnotations;
using DDGS.Core.DataGrid.Models.Constraints;

namespace DDGS.Api.DataGrid.Dto
{
    public record DataGridRenameDto
    {
        [Required]
        [MinLength(DataGridConstraints.NameMinLength)]
        [MaxLength(DataGridConstraints.NameMaxLength)]
        public required string Name { get; set; }
    }
}
