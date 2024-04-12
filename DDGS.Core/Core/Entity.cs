using DDGS.Core.Core.Interfaces;

namespace DDGS.Core.Core
{
    public class Entity : IEntity
    {
        public required Guid Id { get; set; }
    }
}
