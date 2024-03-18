namespace back_end_app.DTOs
{
    public class MovieFilterDTO
    {
        public int Page { get; set; }
        public int RecordsPerPage { get; set; }
        public PaginationDTO PaginationDTO
        {
            get
            {
                return new PaginationDTO()
                {
                    Page = Page,
                    RecordsPerPage = RecordsPerPage
                };
            }
        }
        public string Title { get; set; }
        public int GenreId { get; set; }
        public bool OnCinemas { get; set; }
        public bool NextReleases { get; set; }
    }
}
