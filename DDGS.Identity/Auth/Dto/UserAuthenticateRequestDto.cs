using System.ComponentModel.DataAnnotations;
using DDGS.Core.Identity.Models.Constraints;

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
