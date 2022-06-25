using Microsoft.AspNetCore.Identity;

namespace BookshelfApi.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole>? UserRoles { get; set; }
    }
}
