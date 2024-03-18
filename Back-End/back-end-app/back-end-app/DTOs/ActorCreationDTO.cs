using System.ComponentModel.DataAnnotations;
using System;
using Microsoft.AspNetCore.Http;

namespace back_end_app.DTOs
{
    public class ActorCreationDTO
    {
        [Required]
        [StringLength(maximumLength: 200)]
        public string Name { get; set; }
        public string Biography { get; set; }
        public DateTime Birthdate { get; set; }
        public IFormFile Photo { get; set; }
    }
}
