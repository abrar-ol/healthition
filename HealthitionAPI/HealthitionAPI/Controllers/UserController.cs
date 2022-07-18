using HealthitionAPI.DBContext;
using HealthitionAPI.IdentityAuth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace HealthitionAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly HealthitionDBContext _context;

        public UserController(HealthitionDBContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public IList<User> GetAllUsers()
        {
            if (this.User.IsInRole("Admin"))
                return _context.Users.ToList();
            else
                return null;
        }


    }
}
