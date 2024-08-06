namespace DDGS.Core.Identity.Payloads
{
    public record UserAddExternalLoginPayload(
        string ProviderName,
        string ExternalLoginUserId,
        string ProviderDisplayedName);
}
