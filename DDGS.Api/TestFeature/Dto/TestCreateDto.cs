using System.Text.Json.Serialization;
using DDGS.Core.TestFeature;
using DDGS.Core.TestFeature.Payloads;
using Mapster;

namespace DDGS.Api.TestFeature.Dto
{
    [AdaptTo(typeof(TestCreatePayload))]
    public record TestCreateDto
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
