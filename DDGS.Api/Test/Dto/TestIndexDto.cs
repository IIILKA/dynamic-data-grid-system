using System.Text.Json.Serialization;

namespace DDGS.Api.Test.Dto
{
    public record TestIndexDto
    {
        [JsonPropertyName("id")]
        public Guid Id { get; init; }

        [JsonPropertyName("name")]
        public string Name { get; init; }
    }
}
