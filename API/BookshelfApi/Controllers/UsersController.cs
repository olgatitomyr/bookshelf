using AutoMapper;
using BookshelfApi.Dtos;
using BookshelfApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BookshelfApi.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public UsersController(IConfiguration config,
            IMapper mapper,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = nameof(GetUser))]
        public async Task<IActionResult> GetUser(int id)
        {
            //Claim? claim = User.FindFirst(ClaimTypes.NameIdentifier);
            //bool isCurrentUser = int.Parse(claim?.Value) == id;

            var user = await _userManager.FindByIdAsync(id.ToString());

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto user)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userToCreate = _mapper.Map<User>(user);

            var result = await _userManager.CreateAsync(userToCreate, user.Password);

            if (result.Succeeded)
            {
                return CreatedAtRoute("GetUser", new { Controller = "Users", Id = userToCreate.Id },
                    userToCreate);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUser)
        {
            var user = await _userManager.FindByNameAsync(loginUser.UserName);

            if (user == null)
            {
                return Unauthorized();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginUser.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            var appUser = await _userManager.Users.Include(u => u.FavoriteBooks)
                .FirstAsync(u =>
                    u.NormalizedUserName.Equals(loginUser.UserName.ToUpperInvariant()));

            return Ok(new
            {
                Token = await GenerateJwtToken(appUser),
                User = appUser
            });
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Token").Value);
            var creds = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
