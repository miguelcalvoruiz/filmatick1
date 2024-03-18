import { actorMovieDTO } from "../actors/actor";
import { cinemaDTO } from "../cinemas/cinema";
import { genreDTO } from "../genres/genres";

export interface MovieCreationDTO {
    title: string;
    summary: string;
    onCinemas: boolean;
    releaseDate: Date;
    trailer: string;
    poster: File;
    genresIds: number[];
    actors: actorMovieDTO[];
    cinemasIds: number[];
}

export interface MovieDTO {
    id: number;
    title: string;
    summary: string;
    onCinemas: boolean;
    releaseDate: Date;
    trailer: string;
    poster: string;
    genres: genreDTO[];
    actors: actorMovieDTO[];
    cinemas: cinemaDTO[];
    userVote: number;
    averageVote: number;
}

export interface MoviePostGet {
    genres: genreDTO[];
    cinemas: cinemaDTO[];
}

export interface MoviePutGet {
    movie: MovieDTO,
    selectedGenres: genreDTO[];
    unselectedGenres: genreDTO[];
    selectedCinemas: cinemaDTO[];
    unselectedCinemas: cinemaDTO[];
    actors: actorMovieDTO[];
}

export interface LandingPageDTO {
    onCinemas: MovieDTO[];
    nextReleases: MovieDTO[];
}