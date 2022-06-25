using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace BookshelfApi.Models
{
    public static class SeedData
    {
        private class BookWithAuthorName : Book { public string AuthorName { get; set; } = string.Empty; }
        public static async Task SeedDatabaseAsync(DataContext context, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            context.Database.Migrate();

            if (context.Books.Count() == 0 && context.Authors.Count() == 0 && context.Users.Count() == 0)
            {
                var authorData = await File.ReadAllTextAsync("Data/authors.json");
                var authors = JsonSerializer.Deserialize<List<Author>>(authorData) ?? Enumerable.Empty<Author>();

                await context.Authors.AddRangeAsync(authors);
                await context.SaveChangesAsync();

                var bookData = await File.ReadAllTextAsync("Data/books.json");
                var books = JsonSerializer.Deserialize<List<BookWithAuthorName>>(bookData) 
                    ?? Enumerable.Empty<BookWithAuthorName>();

                foreach (var book in books)
                {
                    book.AuthorId = authors.First(a => a.Name == book.AuthorName).AuthorId;
                }
                
                await context.Books.AddRangeAsync(books);
                await context.SaveChangesAsync();

                await CreateUsers(userManager, roleManager);
                var adminUser = await userManager.FindByNameAsync("admin");
                adminUser.FavoriteBooks.Add(books.First());

                await userManager.UpdateAsync(adminUser);
                await context.SaveChangesAsync();
            }
        }

        private static async Task CreateUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            var roles = new List<Role>
                {
                    new Role { Name = "Member" }
                };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            var adminUser = new User { UserName = "admin" };

            IdentityResult result = await userManager.CreateAsync(adminUser, "Password_1");

            if (result.Succeeded)
            {
                var admin = await userManager.FindByNameAsync(adminUser.UserName);
                await userManager.AddToRolesAsync(admin, new[] { "Member" });
            }
        }
    }
}