using System.Collections.Generic;

namespace back_end_app.DTOs
{
    public class MoviesPutGetDTO
    {
        public MovieDTO Movie { get; set; }
        public List<GenreDTO> SelectedGenres { get; set; }
        public List<GenreDTO> UnselectedGenres { get; set; }
        public List<CinemaDTO> SelectedCinemas { get; set; }
        public List<CinemaDTO> UnselectedCinemas { get; set; }
        public List<MovieActorDTO> Actors { get; set; }
    }
}
