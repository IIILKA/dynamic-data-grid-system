using System.ComponentModel.DataAnnotations;
using DDGS.Core.Identity.Entities.Constraints;

namespace DDGS.Identity.Auth.Dto
{
    public record UserAuthenticateRequestDto
    {
        [Required]
        [EmailAddress]
        public required string Email { get; init; }

        [Required]
        [MinLength(UserConstraints.PasswordMinLength)]
        public required string Password { get; init; }
    }
}
