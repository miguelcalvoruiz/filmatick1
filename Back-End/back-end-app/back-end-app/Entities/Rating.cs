using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace back_end_app.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        [Range(1, 5)]
        public int Score { get; set; }
        public int MovieId { get; set; }
        public Movie Movie { get; set; }
        public string UserId { get; set; }
        public IdentityUser User { get; set; }
    }
}
