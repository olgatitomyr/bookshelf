using BookshelfApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookshelfApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorsController : ControllerBase
    {
        private readonly DataContext context;

        public AuthorsController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IAsyncEnumerable<Author> GetAuthors()
        {
            return context.Authors.AsAsyncEnumerable();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthor(long id)
        {
            var author = await context.Authors.Include(a => a.Books).FirstOrDefaultAsync(a => a.AuthorId == id);
            if (author is null) return NotFound();

            author.Biography = System.Web.HttpUtility.HtmlDecode(author.Biography);
            return Ok(author);
        }
    }
}
