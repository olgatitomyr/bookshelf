namespace BookshelfApi.Models
{
    public class Book
    {
        public long BookId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public long AuthorId { get; set; }
        public Author? Author { get; set; }
        public double Rating { get; set; } = 0;
        public int PagesCount { get; set; } = 0;
        public string Country { get; set; } = string.Empty;
        public string Period { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string ImageName { get; set; } = string.Empty;
        public ICollection<User>? LikedBy { get; set; }
    }
}
