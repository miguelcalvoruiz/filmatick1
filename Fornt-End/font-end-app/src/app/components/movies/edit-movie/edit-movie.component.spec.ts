import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMovieComponent } from './edit-movie.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../../../services/movies/movies.service';
import { of } from 'rxjs';
import { MovieDTO, MoviePutGet } from '../../../interfaces/movies/movie';
import { actorMovieDTO } from '../../../interfaces/actors/actor';
import { MultipleSelectorModel } from 'src/app/interfaces/selector-multiple/multipleSelectorModel';

describe('EditMovieComponent', () => {
  let component: EditMovieComponent;
  let fixture: ComponentFixture<EditMovieComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['putGet', 'edit']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['params']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [EditMovieComponent],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
      .compileComponents();

    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    activatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie data on init', () => {
    const moviePutGet: MoviePutGet = {
      movie: {
        id: 1,
        title: 'Movie Title',
        summary: 'Movie Summary',
        onCinemas: true,
        releaseDate: new Date(),
        trailer: 'https://www.example.com/trailer',
        poster: 'poster.jpg',
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
    activatedRoute.params = of({ id: 1 });
    moviesService.putGet.and.returnValue(of(moviePutGet));

    fixture.detectChanges();

    expect(component.model).toEqual(moviePutGet.movie);
    expect(component.selectedGenres).toEqual(
      moviePutGet.selectedGenres.map(genre => {
        return { key: genre.id, value: genre.name } as MultipleSelectorModel;
      })
    );
    expect(component.unselectedGenres).toEqual(
      moviePutGet.unselectedGenres.map(genre => {
        return { key: genre.id, value: genre.name } as MultipleSelectorModel;
      })
    );
    expect(component.selectedCinemas).toEqual(
      moviePutGet.selectedCinemas.map(cinema => {
        return { key: cinema.id, value: cinema.name } as MultipleSelectorModel;
      })
    );
    expect(component.unselectedCinemas).toEqual(
      moviePutGet.unselectedCinemas.map(cinema => {
        return { key: cinema.id, value: cinema.name } as MultipleSelectorModel;
      })
    );
    expect(component.actorsSelected).toEqual(moviePutGet.actors);
  });

  it('should save changes and navigate to movie details page', () => {
    const movieCreationDTO: any = {};
    const movieId = 1;
    moviesService.edit.and.returnValue(of(null as any));
    component.model = { id: movieId } as MovieDTO;

    component.saveChanges(movieCreationDTO);

    expect(moviesService.edit).toHaveBeenCalledWith(movieId, movieCreationDTO);
    expect(router.navigate).toHaveBeenCalledWith(['/movie/' + movieId]);
  });
});
