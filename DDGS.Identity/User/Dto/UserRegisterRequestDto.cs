using System.ComponentModel.DataAnnotations;

namespace DDGS.Identity.User.Dto
{
    public record UserRegisterRequestDto
    {
        [Required]
        public string Username { get; init; }

        [Required]
        public string Email { get; init; }

        [Required]
        public string Password { get; init; }
    }
}
