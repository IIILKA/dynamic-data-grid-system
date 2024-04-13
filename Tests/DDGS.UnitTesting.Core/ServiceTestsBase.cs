using AutoFixture;
using MapsterMapper;
using NSubstitute;

namespace DDGS.UnitTesting.Core
{
    public class ServiceTestsBase<TService>
    {
        protected TService Service { get; init; }

        protected IMapper Mapper { get; }

        protected IFixture Fixture { get; }

        public ServiceTestsBase()
        {
            Fixture = new Fixture();

            Mapper = Substitute.For<IMapper>();
        }
    }
}
