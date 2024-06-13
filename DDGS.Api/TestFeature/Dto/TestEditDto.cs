using System.Text.Json.Serialization;
using Mapster;

namespace DDGS.Api.TestFeature.Dto
{
    [AdaptFrom(typeof(TestEditDto))]
    public record TestEditDto
    {
        [JsonPropertyName("index")]
        public required int Index { get; init; }

        [JsonPropertyName("login")]
        public string? Login { get; init; }

        [JsonPropertyName("password")]
        public string? Password { get; init; }

        [JsonPropertyName("age")]
        public int Age { get; init; }

        [JsonPropertyName("isStudent")]
        public bool IsStudent { get; init; }
    }
}
