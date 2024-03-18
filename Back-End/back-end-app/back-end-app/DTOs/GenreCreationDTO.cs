using back_end_app.Validations;
using System.ComponentModel.DataAnnotations;

namespace back_end_app.DTOs
{
    public class GenreCreationDTO
    {
        [Required(ErrorMessage = "El campo {0} es requqerido")]
        [StringLength(maximumLength: 50)]
        [FirstCapitalLetter]
        public string Name { get; set; }
    }
}
