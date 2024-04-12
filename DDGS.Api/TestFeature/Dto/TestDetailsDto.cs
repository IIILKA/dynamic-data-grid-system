using System;
using System.Text.Json.Serialization;

namespace DDGS.Api.TestFeature.Dto
{
    public record TestDetailsDto
    {
        [JsonPropertyName("id")]
        public Guid Id { get; init; }

        [JsonPropertyName("name")]
        public string Name { get; init; }
    }
}
