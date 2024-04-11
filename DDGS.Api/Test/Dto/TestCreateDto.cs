using System.Text.Json.Serialization;

namespace DDGS.Api.Test.Dto
{
    public record TestCreateDto
    {
        [JsonPropertyName("name")]
        public string Name { get; init; }
    }
}
