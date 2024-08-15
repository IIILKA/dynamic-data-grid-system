namespace DDGS.Core.Identity.Entities.Payloads
{
    public record UserAddExternalLoginPayload(
        string ProviderName,
        string ExternalLoginUserId,
        string ProviderDisplayedName);
}
