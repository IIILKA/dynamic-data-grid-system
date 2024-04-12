using System.Text.Json.Serialization;
using DDGS.Core.TestFeature;
using Mapster;

namespace DDGS.Api.TestFeature.Dto
{
    [AdaptFrom(typeof(Test))]
    public record TestDetailsDto
    {
        [JsonPropertyName("id")]
        public required Guid Id { get; init; }

        [JsonPropertyName("name")]
        public required string Name { get; init; }
    }
}
