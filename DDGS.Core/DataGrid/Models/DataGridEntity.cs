using System.ComponentModel.DataAnnotations;
using DDGS.Core.Core;
using DDGS.Core.Identity.Entities;

namespace DDGS.Core.DataGrid.Models
{
    public class DataGridEntity : Entity
    {
        [Required]
        [MinLength(DataGridConstraints.NameMinLength)]
        [MaxLength(DataGridConstraints.NameMaxLength)]
        public required string Name { get; set; }

        public required User Owner { get; set; }

        public required DateTimeOffset DateCreated { get; set; }

        public required List<DataGridColumnEntity> Columns { get; set; }
    }
}
