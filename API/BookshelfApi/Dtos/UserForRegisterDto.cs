using System.ComponentModel.DataAnnotations;

namespace BookshelfApi.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; } = String.Empty;

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = String.Empty;

        [Required]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "The password length should be between 8 and 20 characters")]
        [DataType(DataType.Password)]
        public string Password { get; set; } = String.Empty;

        [Required]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; } = String.Empty;

        public UserForRegisterDto() { }
    }
}
