using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace back_end_app.Entities
{
    public class Actor
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 200)]
        public string Name { get; set; }
        public string Biography { get; set; }
        public DateTime Birthdate { get; set; }
        public string Photo {  get; set; }
        public List<MoviesActors> MoviesActors { get; set; }
    }
}
