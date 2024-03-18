using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;

namespace back_end_app.DTOs
{
    public class MovieDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public bool OnCinemas { get; set; }
        public DateTime releaseDate { get; set; }
        public string Poster { get; set; }
        public List<GenreDTO> Genres { get; set; }
        public List<MovieActorDTO> Actors { get; set; }
        public List<CinemaDTO> Cinemas { get; set; }
        public int userVote { get; set; }
        public double averageVote { get; set; }
    }
}
