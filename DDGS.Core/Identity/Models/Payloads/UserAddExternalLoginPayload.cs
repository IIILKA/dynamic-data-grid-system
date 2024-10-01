namespace DDGS.Core.Identity.Models.Payloads
{
    public record UserAddExternalLoginPayload(
        string ProviderName,
        string ExternalLoginUserId,
        string ProviderDisplayedName);
}
