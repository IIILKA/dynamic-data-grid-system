using System.ComponentModel.DataAnnotations;

namespace DDGS.Identity.Auth.Dto
{
    public class UserAuthenticateRequestDto
    {
        [Required]
        public string Email { get; init; }

        [Required]
        public string Password { get; init; }
    }
}
