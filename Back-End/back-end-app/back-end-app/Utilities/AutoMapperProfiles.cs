using AutoMapper;
using back_end_app.DTOs;
using back_end_app.Entities;
using Microsoft.AspNetCore.Identity;
using NetTopologySuite.Geometries;
using System.Collections.Generic;

namespace back_end_app.Utilities
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles(GeometryFactory geometryFactory) 
        {
            CreateMap<Genre, GenreDTO>().ReverseMap();
            CreateMap<GenreCreationDTO, Genre>();

            CreateMap<Actor, ActorDTO>().ReverseMap();
            CreateMap<ActorCreationDTO, Actor>()
                .ForMember(x => x.Photo, options => options.Ignore());

            CreateMap<CinemaCreationDTO, Cinema>()
                .ForMember(x => x.Ubication, x => x.MapFrom(dto =>
                    geometryFactory.CreatePoint(new Coordinate(dto.Longitude, dto.Latitude))));
            CreateMap<Cinema, CinemaDTO>()
                .ForMember(x => x.Latitude, dto => dto.MapFrom(field => field.Ubication.Y))
                .ForMember(x => x.Longitude, dto => dto.MapFrom(field => field.Ubication.X));

            CreateMap<MovieCreationDTO, Movie>()
                .ForMember(x => x.Poster, options => options.Ignore())
                .ForMember(x => x.MoviesGenres, opciones => opciones.MapFrom(MapOutMoviesGenres))
                .ForMember(x => x.MoviesCinemas, opciones => opciones.MapFrom(MapOutMoviesCinemas))
                .ForMember(x => x.MoviesActors, opciones => opciones.MapFrom(MapOutMoviesActors));

            CreateMap<Movie, MovieDTO>()
                .ForMember(x => x.Genres, opciones => opciones.MapFrom(MapOutMoviesGenres))
                .ForMember(x => x.Actors, opciones => opciones.MapFrom(MapOutMoviesActors))
                .ForMember(x => x.Cinemas, opciones => opciones.MapFrom(MapOutMoviesCinemas));

            CreateMap<IdentityUser, UserDTO>();
        }

        private List<MoviesGenres> MapOutMoviesGenres(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MoviesGenres>();

            if (movieCreationDTO.GenresIds == null)
            {
                return result;
            }

            foreach (var id in movieCreationDTO.GenresIds)
            {
                result.Add(new MoviesGenres() { GenreId = id });
            }

            return result;
        }

        private List<GenreDTO> MapOutMoviesGenres(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<GenreDTO>();

            if (movie.MoviesGenres != null)
            {
                foreach (var genre in movie.MoviesGenres)
                {
                    result.Add(new GenreDTO() { Id = genre.GenreId, Name = genre.Genre.Name });
                }
            }

            return result;
        }



        private List<MoviesCinemas> MapOutMoviesCinemas(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MoviesCinemas>();

            if (movieCreationDTO.CinemasIds == null)
            {
                return result;
            }

            foreach (var id in movieCreationDTO.CinemasIds)
            {
                result.Add(new MoviesCinemas() { CinemaId = id });
            }

            return result;
        }

        private List<CinemaDTO> MapOutMoviesCinemas(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<CinemaDTO>();

            if (movie.MoviesCinemas != null)
            {
                foreach (var cinemaMovies in movie.MoviesCinemas)
                {
                    result.Add(new CinemaDTO()
                    {
                        Id = cinemaMovies.CinemaId,
                        Name = cinemaMovies.Cinema.Name,
                        Latitude = cinemaMovies.Cinema.Ubication.Y,
                        Longitude = cinemaMovies.Cinema.Ubication.X
                    });
                }
            }

            return result;
        }

        private List<MoviesActors> MapOutMoviesActors(MovieCreationDTO movieCreationDTO, Movie movie)
        {
            var result = new List<MoviesActors>();

            if (movieCreationDTO.Actors == null)
            {
                return result;
            }

            foreach (var actor in movieCreationDTO.Actors)
            {
                result.Add(new MoviesActors() { ActorId = actor.Id, Character = actor.Character });
            }

            return result;
        }

        private List<MovieActorDTO> MapOutMoviesActors(Movie movie, MovieDTO movieDTO)
        {
            var result = new List<MovieActorDTO>();

            if (movie.MoviesActors != null)
            {
                foreach (var actorMovies in movie.MoviesActors)
                {
                    result.Add(new MovieActorDTO() { 
                        Id = actorMovies.ActorId, 
                        Name = actorMovies.Actor.Name, 
                        Photo = actorMovies.Actor.Photo,
                        Order = actorMovies.Order,
                        Character = actorMovies.Character
                    });
                }
            }

            return result;
        }
    }
}
