using HealthitionAPI.DBContext;
using HealthitionAPI.IdentityAuth;
using HealthitionAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace HealthitionAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly HealthitionDBContext _context;

        public PostController(HealthitionDBContext context)
        {
            _context = context;
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Post>> DeletePost(int id)
        {
            if (this.User.IsInRole("Admin"))
            {
                var thePost = await _context.Posts.FindAsync(id);
                if (thePost == null)
                {
                    return NotFound();
                }

                _context.Posts.Remove(thePost);
                await _context.SaveChangesAsync();

                return thePost;
            }
            else
            {
                // Not Admin !
                return null;
            }

            
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.id == id);
        }
    

    [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            return await _context.Posts.ToListAsync();
        }

        [HttpPost]
        [ActionName("PostInfo")]
        public async Task<ActionResult<Post>> PostInfo(Post post)
        {
            _context.Posts.Add(post);

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(PostInfo), new { id = post.id }, post);
        }
    }
}
