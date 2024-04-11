using System.Text.Json.Serialization;

namespace DDGS.Api.Test.Dto
{
    public record TestEditDto
    {
        [JsonPropertyName("name")]
        public string Name { get; init; }
    }
}
