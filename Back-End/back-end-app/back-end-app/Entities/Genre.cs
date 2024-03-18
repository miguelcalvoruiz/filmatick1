using back_end_app.Validations;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace back_end_app.Entities
{
    public class Genre
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo {0} es requqerido")]
        [StringLength(maximumLength: 50)]
        [FirstCapitalLetter]
        public string Name { get; set; }
        public List<MoviesGenres> MoviesGenres { get; set; }
    }
}
