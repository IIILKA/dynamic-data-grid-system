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
