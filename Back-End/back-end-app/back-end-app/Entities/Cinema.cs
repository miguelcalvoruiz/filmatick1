using NetTopologySuite.Geometries;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace back_end_app.Entities
{
    public class Cinema
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 75)]
        public string Name { get; set; }
        public Point Ubication { get; set; }
        public List<MoviesCinemas> MoviesCinemas { get; set; }
    }
}
