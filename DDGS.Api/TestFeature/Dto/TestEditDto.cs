using System.Text.Json.Serialization;
using Mapster;

namespace DDGS.Api.TestFeature.Dto
{
    [AdaptFrom(typeof(TestEditDto))]
    public record TestEditDto
    {
        [JsonPropertyName("name")]
        public required string Name { get; init; }
    }
}
