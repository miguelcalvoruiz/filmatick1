using System.ComponentModel.DataAnnotations;

namespace back_end_app.DTOs
{
    public class UserCredentials
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
