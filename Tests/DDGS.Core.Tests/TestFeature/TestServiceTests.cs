using AutoFixture;
using DDGS.Core.TestFeature;
using DDGS.Core.TestFeature.Interfaces;
using DDGS.Core.TestFeature.Payloads;
using DDGS.UnitTesting.Core;
using NSubstitute;
using Shouldly;
using Xunit;

namespace DDGS.Core.Tests.TestFeature
{
    public class TestServiceTests : ServiceTestsBase<ITestService>
    {
        private readonly ITestRepository _repository;

        public TestServiceTests()
        {
            _repository = Substitute.For<ITestRepository>();

            Service = new TestService(_repository, Mapper);
        }

        [Fact]
        public async Task GetManyAsync_Default_TestList()
        {
            //Arrange
            var entityList = Fixture.Create<List<Test>>();

            _repository.GetManyAsync().Returns(entityList);

            //Act
            var result = await Service.GetManyAsync();

            //Assert
            result.ShouldBe(entityList);
        }

        [Fact]
        public async Task GetAsync_Default_Test()
        {
            //Arrange
            var entity = Fixture.Create<Test>();

            var id = Fixture.Create<Guid>();

            _repository.GetAsync(id).Returns(entity);

            //Act
            var result = await Service.GetAsync(id);

            //Assert
            result.ShouldBe(entity);
        }

        [Fact]
        public async Task CreateAsync_Default_Test()
        {
            //Arrange
            var entity = Fixture.Create<Test>();

            var payload = Fixture.Create<TestCreatePayload>();

            Mapper.Map<Test>(payload).Returns(entity);

            var createdEntity = Fixture.Create<Test>();

            _repository.CreateAsync(entity).Returns(createdEntity);

            //Act
            var result = await Service.CreateAsync(payload);

            //Assert
            result.ShouldBe(createdEntity);
        }

        [Fact]
        public async Task UpdateAsync_Default_Test()
        {
            //Arrange
            var id = Fixture.Create<Guid>();

            var entity = Fixture.Build<Test>()
                .With(_ => _.Id, id)
                .Create();

            var payload = Fixture.Create<TestEditPayload>();

            Mapper.Map<Test>(payload).Returns(entity);

            var createdEntity = Fixture.Create<Test>();

            _repository.UpdateAsync(entity).Returns(createdEntity);

            //Act
            var result = await Service.UpdateAsync(id, payload);

            //Assert
            result.ShouldBe(createdEntity);
        }

        [Fact]
        public async Task DeleteAsync_Default_Task()
        {
            //Arrange
            var id = Fixture.Create<Guid>();

            //Act
            await Service.DeleteAsync(id);

            //Assert
            await _repository.Received().DeleteAsync(id);
        }
    }
}
