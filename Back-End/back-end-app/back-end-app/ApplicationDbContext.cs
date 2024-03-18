using back_end_app.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace back_end_app
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MoviesActors>()
                .HasKey(x => new { x.ActorId, x.MovieId });

            modelBuilder.Entity<MoviesGenres>()
                .HasKey(x => new { x.MovieId, x.GenreId });

            modelBuilder.Entity<MoviesCinemas>()
                .HasKey(x => new { x.MovieId, x.CinemaId });

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Genre> Genres {  get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Cinema> Cinema { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<MoviesActors> MoviesActors { get; set; }
        public DbSet<MoviesGenres> MoviesGenres { get; set; }
        public DbSet<MoviesCinemas> MoviesCinemas { get; set; }
        public DbSet<Rating> Ratings { get; set; }
    }
}
