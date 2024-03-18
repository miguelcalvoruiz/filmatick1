using System.ComponentModel.DataAnnotations;

namespace back_end_app.DTOs
{
    public class RatingDTO
    {
        public int MovieID { get; set; }
        [Range(1,5)]
        public int Score { get; set; }
    }
}
