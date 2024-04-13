using DDGS.Infrastructure.Core.Interfaces;

namespace DDGS.Infrastructure.Core
{
    public class EntityIdGenerator : IEntityIdGenerator
    {
        public Guid GenerateId()
        {
            return Guid.NewGuid();
        }
    }
}
