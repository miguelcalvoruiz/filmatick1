using System.ComponentModel.DataAnnotations;
using System;

namespace back_end_app.DTOs
{
    public class ActorDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Biography { get; set; }
        public DateTime Birthdate { get; set; }
        public string Photo { get; set; }
    }
}
