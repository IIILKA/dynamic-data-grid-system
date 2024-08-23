using System.ComponentModel.DataAnnotations;
using DDGS.Core.DataGrid.Models;

namespace DDGS.Api.DataGrid.Dto
{
    public record DataGridAddColumnDto
    {
        [Required]
        [MinLength(DataGridColumnConstraints.NameMinLength)]
        [MaxLength(DataGridColumnConstraints.NameMaxLength)]
        public required string Name { get; init; }

        public DataGridColumnType Type { get; init; }

        [Range(DataGridColumnConstraints.IndexMinValue, DataGridColumnConstraints.IndexMaxValue)]
        public int Index { get; init; }
    }
}
