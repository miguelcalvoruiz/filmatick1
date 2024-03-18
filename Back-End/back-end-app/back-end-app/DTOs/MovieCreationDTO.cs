using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using back_end_app.Utilities;

namespace back_end_app.DTOs
{
    public class MovieCreationDTO
    {
        [Required]
        [StringLength(maximumLength: 300)]
        public string Title { get; set; }
        public string Summary { get; set; }
        public string Trailer { get; set; }
        public bool OnCinemas { get; set; }
        public DateTime releaseDate { get; set; }
        public IFormFile Poster { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> GenresIds { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> CinemasIds { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<ActorMovieCreationDTO>>))]
        public List<ActorMovieCreationDTO> Actors { get; set; }

    }
}
