using AutoMapper;
using back_end_app.DTOs;
using back_end_app.Entities;
using back_end_app.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.Internal.AsyncLock;

namespace back_end_app.Controllers
{
    [ApiController]
    [Route("api/movies")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class MoviesController: ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IAzureStorageFiles storageFiles;
        private readonly UserManager<IdentityUser> userManager;
        private readonly string container = "movies";

        public MoviesController(ApplicationDbContext context, IMapper mapper, IAzureStorageFiles storageFiles,
            UserManager<IdentityUser> userManager) 
        {
            this.context = context;
            this.mapper = mapper;
            this.storageFiles = storageFiles;
            this.userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<LandingPageDTO>> Get()
        {
            var top = 6;
            var today = DateTime.Today;

            var nextReleases = await context.Movies
                .Where(x => x.releaseDate > today)
                .OrderBy(x => x.releaseDate)
                .Take(top)
                .ToListAsync();

            var onCinemas = await context.Movies
                .Where(x => x.OnCinemas)
                .OrderBy(x => x.releaseDate)
                .Take(top)
                .ToListAsync();

            var result = new LandingPageDTO();
            result.NextReleases = mapper.Map<List<MovieDTO>>(nextReleases);
            result.OnCinemas = mapper.Map<List<MovieDTO>>(onCinemas);

            return result;
        }


        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult<MovieDTO>> Get(int id)
        {
            var movie = await context.Movies
                .Include(x => x.MoviesGenres).ThenInclude(x => x.Genre)
                .Include(x => x.MoviesActors).ThenInclude(x => x.Actor)
                .Include(x => x.MoviesCinemas).ThenInclude(x => x.Cinema)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            var averageVote = 0.0;
            var userVote = 0;

            if (await context.Ratings.AnyAsync(x => x.MovieId == id))
            {
                averageVote = await context.Ratings.Where(x => x.MovieId == id).
                    AverageAsync(x => x.Score);
                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var user = await userManager.FindByEmailAsync(email);
                    var userId = user.Id;
                    var ratingDB = await context.Ratings.FirstOrDefaultAsync(x => x.UserId == userId && x.MovieId == id);

                    if (ratingDB != null)
                    {
                        userVote = ratingDB.Score;
                    }
                }
            }
            var dto = mapper.Map<MovieDTO>(movie);
            dto.userVote = userVote;
            dto.averageVote = averageVote;
            dto.Actors = dto.Actors.OrderBy(x => x.Order).ToList();
            return dto;
        }

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult<List<MovieDTO>>> Filter([FromQuery] MovieFilterDTO movieFilterDTO)
        {
            var moviesQueryable = context.Movies.AsQueryable();

            if (!string.IsNullOrEmpty(movieFilterDTO.Title))
            {
                moviesQueryable = moviesQueryable.Where(x => x.Title.Contains(movieFilterDTO.Title));
            }
            if (movieFilterDTO.OnCinemas)
            {
                moviesQueryable = moviesQueryable.Where(x => x.OnCinemas);
            }

            if (movieFilterDTO.NextReleases)
            {
                var today = DateTime.Today;
                moviesQueryable = moviesQueryable.Where(x => x.releaseDate > today);
            }

            if (movieFilterDTO.GenreId != 0)
            {
                moviesQueryable = moviesQueryable
                    .Where(x => x.MoviesGenres.Select(y => y.GenreId)
                    .Contains(movieFilterDTO.GenreId));
            }

            await HttpContext.InsertPaginationParametersInHeader(moviesQueryable);

            var movies = await moviesQueryable.Paginate(movieFilterDTO.PaginationDTO).ToListAsync();
            return mapper.Map<List<MovieDTO>>(movies);
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] MovieCreationDTO movieCreationDTO)
        {
            var movie = mapper.Map<Movie>(movieCreationDTO);
            if (movieCreationDTO.Poster != null)
            {
                movie.Poster = await storageFiles.SaveFile(container, movieCreationDTO.Poster);
            }
            WriteOrderActors(movie);

            context.Add(movie);
            await context.SaveChangesAsync();
            return movie.Id;
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<MoviesPostGetDTO>> PostGet()
        {
            var cinemas = await context.Cinema.ToListAsync();
            var genres = await context.Genres.ToListAsync();

            var cinemasDTO = mapper.Map<List<CinemaDTO>>(cinemas);
            var genresDTO = mapper.Map<List<GenreDTO>>(genres);

            return new MoviesPostGetDTO()
            {
                Cinemas = cinemasDTO,
                Genres = genresDTO
            };
        }


        [HttpGet("PutGet/{id:int}")]
        public async Task<ActionResult<MoviesPutGetDTO>> PutGet(int id)
        {
            var movieActionResult = await Get(id);
            if (movieActionResult.Result is NotFoundResult)
            {
                return NotFound();
            }

            var movie = movieActionResult.Value;

            var selectedGenresIds = movie.Genres.Select(x => x.Id).ToList();
            var unselectedGenres = await context.Genres
                .Where(x => !selectedGenresIds.Contains(x.Id))
                .ToListAsync();
            var selectedCinemasIds = movie.Cinemas.Select(x => x.Id).ToList();
            var unselectedCinemas = await context.Cinema
                .Where(x => !selectedCinemasIds.Contains(x.Id))
                .ToListAsync();

            var unselectedGenresDTO = mapper.Map<List<GenreDTO>>(unselectedGenres);
            var unselectedCinemasDTO = mapper.Map<List<CinemaDTO>>(unselectedCinemas);

            var response = new MoviesPutGetDTO();
            response.Movie = movie;
            response.SelectedGenres = movie.Genres;
            response.UnselectedGenres = unselectedGenresDTO;
            response.SelectedCinemas = movie.Cinemas;
            response.UnselectedCinemas = unselectedCinemasDTO;
            response.Actors = movie.Actors;

            return response;
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] MovieCreationDTO movieCreationDTO)
        {
            var movie = await context.Movies
                .Include(x => x.MoviesActors)
                .Include(x => x.MoviesCinemas)
                .Include(x => x.MoviesGenres)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return NotFound();
            }

            movie = mapper.Map(movieCreationDTO, movie);

            if (movieCreationDTO.Poster != null)
            {
                movie.Poster = await storageFiles.EditFile(container, movieCreationDTO.Poster, movie.Poster);
            }

            WriteOrderActors(movie);

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var movie = await context.Movies.FirstOrDefaultAsync(x => x.Id == id);
            if (movie == null)
            {
                return NotFound();
            }
            context.Remove(movie);
            await context.SaveChangesAsync();
            await storageFiles.DeleteFile(movie.Poster, container);
            return NoContent();
        }

        private void WriteOrderActors(Movie movie)
        {
            if (movie.MoviesActors != null)
            {
                for (int i = 0;  i < movie.MoviesActors.Count; i++)
                {
                    movie.MoviesActors[i].Order = i;
                }
            }
        }
    }
}
