using System.ComponentModel.DataAnnotations;
using DDGS.Core.Core.Interfaces;

namespace DDGS.Core.Core
{
    public class Entity : IEntity
    {
        [Key]
        public required Guid Id { get; set; }
    }
}
