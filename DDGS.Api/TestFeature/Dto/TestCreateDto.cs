using System.Text.Json.Serialization;

namespace DDGS.Api.TestFeature.Dto
{
    public record TestCreateDto
    {
        [JsonPropertyName("name")]
        public string Name { get; init; }
    }
}
