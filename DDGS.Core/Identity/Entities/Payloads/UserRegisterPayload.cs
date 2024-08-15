namespace DDGS.Core.Identity.Entities.Payloads
{
    public record UserRegisterPayload(
        string Username,
        string Email);
}
