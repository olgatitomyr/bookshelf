using BookshelfApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookshelfApi.Controllers
{
    [ApiController]
    [Route("api/users/{userId}/[controller]")]
    [Authorize(AuthenticationSchemes = "Identity.Application, Bearer")]
    public class FavoritesController : ControllerBase
    {
        private readonly DataContext context;
        private readonly UserManager<User> userManager;

        public FavoritesController(DataContext context, UserManager<User> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetFavorites(int userId)
        {
            var user = await context.Users.Include(u => u.FavoriteBooks)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null) return NotFound();

            var favoriteBooks = await context.Books.Include(b => b.Author)
                .Where(b => user.FavoriteBooks.Contains(b)).ToListAsync();
            favoriteBooks.ForEach(b => b.LikedBy = null);
            return Ok(favoriteBooks);
        }

        [HttpPost("add/{bookId}")]
        public async Task<IActionResult> AddToFavorites(int userId, long bookId)
        {
            var user = await context.Users.Include(u => u.FavoriteBooks)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null) return BadRequest();

            var book = user.FavoriteBooks
                .FirstOrDefault(b => b.BookId == bookId);
            
            if (book is not null) return BadRequest();

            book = await context.Books.FindAsync(bookId);

            if (book is null) return NotFound();

            user.FavoriteBooks.Add(book);
            context.Users.Update(user);
            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("remove/{bookId}")]
        public async Task<IActionResult> RemoveFromFavorites(int userId, long bookId)
        {
            var user = await context.Users.Include(u => u.FavoriteBooks)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null) return BadRequest();

            var book = user.FavoriteBooks
                .FirstOrDefault(b => b.BookId == bookId);

            if (book is null) return BadRequest();

            user.FavoriteBooks.Remove(book);
            context.Users.Update(user);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}
