using System.ComponentModel.DataAnnotations;
using DDGS.Core.Core;

namespace DDGS.Core.DataGrid.Models
{
    public class DataGridColumnEntity : Entity
    {
        [Required]
        [MinLength(DataGridColumnConstraints.NameMinLength)]
        [MaxLength(DataGridColumnConstraints.NameMaxLength)]
        public required string Name { get; set; }

        public DataGridColumnType Type { get; set; }

        [Required]
        [Range(DataGridColumnConstraints.IndexMinValue,
            DataGridColumnConstraints.IndexMaxValue)]
        public int Index { get; set; }

        public required DataGridEntity DataGrid { get; set; }
    }
}
