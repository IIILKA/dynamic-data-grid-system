using AutoFixture;
using MapsterMapper;
using NSubstitute;

namespace DDGS.UnitTesting.Core
{
    public class ControllerTestsBase
    {
        protected IMapper Mapper { get; }

        protected IFixture Fixture { get; }

        public ControllerTestsBase()
        {
            Fixture = new Fixture();

            Mapper = Substitute.For<IMapper>();
        }
    }
}
