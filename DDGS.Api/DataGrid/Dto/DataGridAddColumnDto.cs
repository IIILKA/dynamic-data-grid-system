using System.ComponentModel.DataAnnotations;
using DDGS.Core.DataGrid.Models;
using DDGS.Core.DataGrid.Models.Constraints;

namespace DDGS.Api.DataGrid.Dto
{
    public record DataGridAddColumnDto
    {
        [Required]
        [MinLength(DataGridColumnConstraints.NameMinLength)]
        [MaxLength(DataGridColumnConstraints.NameMaxLength)]
        public required string Name { get; init; }

        //TODO: do validation with custom converter https://stackoverflow.com/questions/54202864/enum-as-required-field-in-asp-net-core-webapi
        [Required]
        public DataGridColumnType Type { get; init; }
    }
}
