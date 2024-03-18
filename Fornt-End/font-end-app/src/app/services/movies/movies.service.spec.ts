import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { environment } from 'src/environments/environment';
import { MovieDTO, LandingPageDTO, MoviePostGet, MoviePutGet } from '../../interfaces/movies/movie';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return landing page data', () => {
    const dummyLandingPage: LandingPageDTO = {
      onCinemas: [],
      nextReleases: []
    };

    service.getLandingPage().subscribe(landingPage => {
      expect(landingPage).toEqual(dummyLandingPage);
    });

    const req = httpMock.expectOne(service['getApiURL']());
    expect(req.request.method).toBe('GET');
    req.flush(dummyLandingPage);
  });

  it('should return movie by id', () => {
    const dummyId = 1;
    const dummyMovie: MovieDTO = {
      id: dummyId,
      title: 'Dummy Movie',
      summary: 'This is a dummy movie',
      onCinemas: true,
      releaseDate: new Date(),
      trailer: 'https://dummy-trailer.com',
      poster: 'dummy-poster.jpg',
      genres: [],
      actors: [],
      cinemas: [],
      userVote: 0,
      averageVote: 0
    };

    service.getById(dummyId).subscribe(movie => {
      expect(movie).toEqual(dummyMovie);
    });

    const req = httpMock.expectOne(`${service['getApiURL']()}/${dummyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMovie);
  });

  it('should return movie post get data', () => {
    const dummyMoviePostGet: MoviePostGet = {
      genres: [],
      cinemas: []
    };

    service.postGet().subscribe(data => {
      expect(data).toEqual(dummyMoviePostGet);
    });

    const req = httpMock.expectOne(`${service['getApiURL']()}/postget`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMoviePostGet);
  });

  it('should return movie put get data', () => {
    const dummyId = 1;
    const dummyMoviePutGet: MoviePutGet = {
      movie: {
        id: dummyId,
        title: 'Dummy Movie',
        summary: 'This is a dummy movie',
        onCinemas: true,
        releaseDate: new Date(),
        trailer: 'https://dummy-trailer.com',
        poster: 'dummy-poster.jpg',
        genres: [],
        actors: [],
        cinemas: [],
        userVote: 0,
        averageVote: 0
      },
      selectedGenres: [],
      unselectedGenres: [],
      selectedCinemas: [],
      unselectedCinemas: [],
      actors: []
    };

    service.putGet(dummyId).subscribe(data => {
      expect(data).toEqual(dummyMoviePutGet);
    });

    const req = httpMock.expectOne(`${service['getApiURL']()}/putget/${dummyId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyMoviePutGet);
  });

  it('should filter movies', () => {
    const dummyFilterValues = { genre: 'Action' };
    const dummyFilteredMovies: MovieDTO[] = [{
      id: 1,
      title: 'Dummy Movie',
      summary: 'This is a dummy movie',
      onCinemas: true,
      releaseDate: new Date(),
      trailer: 'https://dummy-trailer.com',
      poster: 'dummy-poster.jpg',
      genres: [],
      actors: [],
      cinemas: [],
      userVote: 0,
      averageVote: 0
    }];

    service.filter(dummyFilterValues).subscribe(response => {
      if (Array.isArray(response.body)) { // Check if response.body is an array
        const titles = response.body.map((movie: MovieDTO) => movie.title);
        const dummyTitles = dummyFilteredMovies.map(movie => movie.title);
        expect(titles).toEqual(dummyTitles);
      } else {
        // If response.body is not an array, handle it accordingly
        fail('Response body is not an array');
      }
    });

    const req = httpMock.expectOne(`${service['getApiURL']()}/filter?genre=Action`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyFilteredMovies); // Modify to match server response structure
  });

  it('should add a movie', () => {
    const dummyMovieId = 1;
    const dummyMovie = {
      title: 'Dummy Movie',
      summary: 'This is a dummy movie',
      onCinemas: true,
      releaseDate: new Date(),
      trailer: 'https://dummy-trailer.com',
      poster: new File([], 'dummy-poster.jpg'),
      genresIds: [1, 2],
      actors: [],
      cinemasIds: [1, 2]
    };

    service.add(dummyMovie).subscribe(id => {
      expect(id).toEqual(dummyMovieId);
    });

    const req = httpMock.expectOne(service['getApiURL']());
    expect(req.request.method).toBe('POST');
    req.flush(dummyMovieId);
  });

  it('should edit a movie', () => {
    const dummyId = 1;
    const dummyMovie = {
      title: 'Updated Dummy Movie',
      summary: 'This is an updated dummy movie',
      onCinemas: true,
      releaseDate: new Date(),
      trailer: 'https://dummy-trailer-updated.com',
      poster: new File([], 'updated-dummy-poster.jpg'),
      genresIds: [1, 2],
      actors: [],
      cinemasIds: [1, 2]
    };

    service.edit(dummyId, dummyMovie).subscribe(() => { });

    const req = httpMock.expectOne(`${service['getApiURL']()}/${dummyId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should delete a movie', () => {
    const dummyId = 1;

    service.delete(dummyId).subscribe(() => { });

    const req = httpMock.expectOne(`${service['getApiURL']()}/${dummyId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
