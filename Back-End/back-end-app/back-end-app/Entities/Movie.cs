using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace back_end_app.Entities
{
    public class Movie
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 300)]
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public bool OnCinemas { get; set; }
        public DateTime releaseDate { get; set; }
        public string Poster {  get; set; }
        public List<MoviesActors> MoviesActors { get; set; }
        public List<MoviesGenres> MoviesGenres { get; set; }
        public List<MoviesCinemas> MoviesCinemas { get; set; }

    }
}
