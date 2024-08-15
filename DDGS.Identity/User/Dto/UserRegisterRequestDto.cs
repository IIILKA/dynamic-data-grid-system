using System.ComponentModel.DataAnnotations;
using DDGS.Core.Identity.Entities.Constraints;

namespace DDGS.Identity.User.Dto
{
    public record UserRegisterRequestDto
    {
        [Required]
        [MinLength(UserConstraints.UsernameMinLength)]
        [MaxLength(UserConstraints.UsernameMaxLength)]
        public required string Username { get; init; }

        [Required]
        [EmailAddress]
        public required string Email { get; init; }

        [Required]
        [MinLength(UserConstraints.PasswordMinLength)]
        public required string Password { get; init; }
    }
}
