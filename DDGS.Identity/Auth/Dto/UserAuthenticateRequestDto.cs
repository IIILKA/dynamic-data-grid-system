using System.ComponentModel.DataAnnotations;
using DDGS.Core.Identity.Entities.Constraints;

namespace DDGS.Identity.Auth.Dto
{
    public class UserAuthenticateRequestDto
    {
        [Required]
        public required string Email { get; init; }

        [Required]
        [MinLength(UserConstraints.PasswordMinLength)]
        public required string Password { get; init; }
    }
}
