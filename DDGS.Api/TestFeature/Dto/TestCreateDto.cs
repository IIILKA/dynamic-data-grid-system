using System.Text.Json.Serialization;
using DDGS.Core.TestFeature;
using DDGS.Core.TestFeature.Payloads;
using Mapster;

namespace DDGS.Api.TestFeature.Dto
{
    [AdaptTo(typeof(TestCreatePayload))]
    public record TestCreateDto
    {
        [JsonPropertyName("name")]
        public required string Name { get; init; }
    }
}
