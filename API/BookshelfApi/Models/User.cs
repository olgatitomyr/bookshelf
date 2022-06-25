using Microsoft.AspNetCore.Identity;

namespace BookshelfApi.Models
{
    public class User : IdentityUser<int>
    {
        public ICollection<Book> FavoriteBooks { get; set; } = new List<Book>();
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    }
}
