namespace BookshelfApi.Models
{
    public class Author
    {
        public long AuthorId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Biography { get; set; } = string.Empty;
        public string BirthDate { get; set; } = string.Empty;
        public string ImageName { get; set; } = string.Empty;
        public IEnumerable<Book>? Books { get; set; }
    }
}
