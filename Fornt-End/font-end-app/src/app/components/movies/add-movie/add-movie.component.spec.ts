import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMovieComponent } from './add-movie.component';
import { MoviesService } from '../../../services/movies/movies.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MovieCreationDTO, MoviePostGet } from '../../../interfaces/movies/movie';

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['postGet', 'add']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddMovieComponent],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();

    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load genres and cinemas on init', () => {
    const genresAndCinemas: MoviePostGet = {
      genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }],
      cinemas: [{ id: 1, name: 'Cinema 1', latitude: 1, longitude: 1 }, { id: 2, name: 'Cinema 2', latitude: 2, longitude: 2 }]
    };
    moviesService.postGet.and.returnValue(of(genresAndCinemas));

    fixture.detectChanges();

    expect(component.genresNotSelected.length).toBe(2);
    expect(component.cinemasNotSelected.length).toBe(2);
  });

  it('should add movie and navigate to movie details page on saveChanges', () => {
    const movieCreationDTO: MovieCreationDTO = {
      title: 'Movie Title',
      summary: 'Movie Summary',
      onCinemas: true,
      releaseDate: new Date(),
      trailer: 'https://www.example.com/trailer',
      poster: new File([], 'poster.jpg'),
      genresIds: [1, 2],
      actors: [],
      cinemasIds: [1, 2]
    };
    const movieId = 1;
    moviesService.add.and.returnValue(of(movieId));

    component.saveChanges(movieCreationDTO);

    expect(moviesService.add).toHaveBeenCalledWith(movieCreationDTO);
    expect(router.navigate).toHaveBeenCalledWith(['/movie/' + movieId]);
  });
});
