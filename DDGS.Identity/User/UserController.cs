using DDGS.Core.Identity.Entities.Payloads;
using DDGS.Core.Identity.Interfaces;
using DDGS.Identity.Core;
using DDGS.Identity.User.Dto;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace DDGS.Identity.User
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;

        public UserController(IIdentityService identityService, IMapper mapper)
        {
            _identityService = identityService;
            _mapper = mapper;
        }

        [HttpGet("login")]
        public IActionResult Login()
        {
            var spaClientUrl = Environment.GetEnvironmentVariable("CLIENT_URL");

            if (string.IsNullOrEmpty(spaClientUrl))
            {
                //TODO: Maybe choose another endpoint
                return Unauthorized();
            }

            return Redirect($"{spaClientUrl}/login");
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterAsync(UserRegisterRequestDto requestDto)
        {
            var payload = _mapper.Map<UserRegisterPayload>(requestDto);

            var result = await _identityService.RegisterAsync(payload, requestDto.Password);

            if (result.IsFailed)
            {
                return BadRequest(new ErrorResponseDto(result.Errors.Select(_ => _.Message).ToArray()));
            }

            return Ok();
        }
    }
}
