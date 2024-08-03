namespace DDGS.Core.Identity.Payloads
{
    public record UserRegisterPayload(
        string Username,
        string Email,
        string Password);
}
