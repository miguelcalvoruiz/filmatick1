using System.Collections.Generic;

namespace back_end_app.DTOs
{
    public class LandingPageDTO
    {
        public List<MovieDTO> OnCinemas { get; set; }
        public List<MovieDTO> NextReleases { get; set; }
    }
}
