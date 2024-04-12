using System.ComponentModel.DataAnnotations;
using DDGS.Core.Core.Interfaces;

namespace DDGS.Infrastructure.Core
{
    public class DbEntity : IEntity
    {
        [Key]
        public required Guid Id { get; set; }
    }
}
