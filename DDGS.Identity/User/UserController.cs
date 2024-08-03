using DDGS.Core.Identity.Payloads;
using DDGS.Core.User.Interfaces;
using DDGS.Identity.User.Dto;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;

namespace DDGS.Identity.User
{
    [ApiController]
    [Route("user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
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

            var result = await _userService.RegisterAsync(payload);

            if (result.IsFailed)
            {
                return BadRequest(new { errors = result.Errors.Select(_ => _.Message).ToArray() });
            }

            return Ok();
        }
    }
}
