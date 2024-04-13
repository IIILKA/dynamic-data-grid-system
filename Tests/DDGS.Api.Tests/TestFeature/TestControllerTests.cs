using AutoFixture;
using DDGS.Api.TestFeature;
using DDGS.Api.TestFeature.Dto;
using DDGS.Core.TestFeature;
using DDGS.Core.TestFeature.Interfaces;
using DDGS.Core.TestFeature.Payloads;
using DDGS.UnitTesting.Core;
using Microsoft.AspNetCore.Mvc;
using NSubstitute;
using Shouldly;

namespace DDGS.Api.Tests.TestFeature
{
    public class TestControllerTests : ControllerTestsBase
    {
        private readonly ITestService _entityService;

        private readonly TestController _controller;

        public TestControllerTests()
        {
            _entityService = Substitute.For<ITestService>();

            _controller = new TestController(_entityService, Mapper);
        }

        [Fact]
        public async Task GetAsync_WithoutParameters_OkObjectResult()
        {
            //Arrange
            var entityList = Fixture.Create<List<Test>>();

            _entityService.GetManyAsync().Returns(entityList);

            var dtoList = Fixture.Create<List<TestIndexDto>>();

            Mapper.Map<List<TestIndexDto>>(entityList).Returns(dtoList);

            //Act
            var result = await _controller.GetAsync();

            //Assert
            result.ShouldBeOfType<OkObjectResult>().ShouldSatisfyAllConditions(_ =>
            {
                _.Value.ShouldBe(dtoList);
            });
        }

        [Fact]
        public async Task GetAsync_WithParameters_OkObjectResult()
        {
            //Arrange
            var id = Fixture.Create<Guid>();

            var entity = Fixture.Create<Test>();

            _entityService.GetAsync(id).Returns(entity);

            var dto = Fixture.Create<TestDetailsDto>();

            Mapper.Map<TestDetailsDto>(entity).Returns(dto);

            //Act
            var result = await _controller.GetAsync(id);

            //Assert
            result.ShouldBeOfType<OkObjectResult>().ShouldSatisfyAllConditions(_ =>
            {
                _.Value.ShouldBe(dto);
            });
        }

        [Fact]
        public async Task PostAsync_Default_OkObjectResult()
        {
            //Arrange
            var dto = Fixture.Create<TestCreateDto>();

            var payload = Fixture.Create<TestCreatePayload>();

            Mapper.Map<TestCreatePayload>(dto).Returns(payload);

            var entity = Fixture.Create<Test>();

            _entityService.CreateAsync(payload).Returns(entity);

            //Act
            var result = await _controller.PostAsync(dto);

            //Assert
            result.ShouldBeOfType<OkObjectResult>().ShouldSatisfyAllConditions(_ =>
            {
                _.Value.ShouldBe(entity.Id);
            });
        }

        [Fact]
        public async Task PutAsync_Default_OkResult()
        {
            //Arrange
            var dto = Fixture.Create<TestEditDto>();

            var payload = Fixture.Create<TestEditPayload>();

            Mapper.Map<TestEditPayload>(dto).Returns(payload);

            var id = Fixture.Create<Guid>();

            //Act
            var result = await _controller.PutAsync(id, dto);

            //Assert
            result.ShouldBeOfType<OkResult>();
            await _entityService.Received().UpdateAsync(id, payload);
        }

        [Fact]
        public async Task DeleteAsync_Default_OkResult()
        {
            //Arrange
            var id = Fixture.Create<Guid>();

            //Act
            var result = await _controller.DeleteAsync(id);

            //Assert
            result.ShouldBeOfType<OkResult>();
            await _entityService.Received().DeleteAsync(id);
        }
    }
}
