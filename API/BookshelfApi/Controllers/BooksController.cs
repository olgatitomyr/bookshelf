using BookshelfApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookshelfApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly DataContext context;

        public BooksController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IAsyncEnumerable<Book> GetBooks()
        {
            return context.Books.Include(b => b.Author).AsAsyncEnumerable();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBook(long id)
        {
            var book = await context.Books.Include(b => b.Author).FirstOrDefaultAsync(b => b.BookId == id);

            if (book is null) return NotFound();

            book.Description = System.Web.HttpUtility.HtmlDecode(book.Description);
            return Ok(book);
        }
    }
}
