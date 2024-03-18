import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MovieDTO } from '../../../interfaces/movies/movie';
import { MoviesService } from '../../../services/movies/movies.service';
import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['delete']);

    await TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      providers: [{ provide: MoviesService, useValue: moviesServiceSpy }]
    }).compileComponents();

    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should emit event when delete button is clicked', () => {
    const movies: MovieDTO[] = [{
      id: 1,
      title: 'Movie 1',
      summary: 'Summary 1',
      onCinemas: true,
      releaseDate: new Date(),
      trailer: 'trailer1.mp4',
      poster: 'poster1.jpg',
      genres: [],
      actors: [],
      cinemas: [],
      userVote: 0,
      averageVote: 0
    }];

    const deleteButton = fixture.debugElement.query(By.css('button'));
    spyOn(window, 'confirm').and.returnValue(true);
    const emitSpy = spyOn(component.deleted, 'emit');
    moviesService.delete.and.returnValue(of(null as any));

    component.movies = movies;
    fixture.detectChanges();

    deleteButton.triggerEventHandler('click', null);

    expect(moviesService.delete).toHaveBeenCalledWith(1);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should render movies list', () => {
    const movies: MovieDTO[] = [
      {
        id: 1,
        title: 'Movie 1',
        summary: 'Summary 1',
        onCinemas: true,
        releaseDate: new Date(),
        trailer: 'trailer1.mp4',
        poster: 'poster1.jpg',
        genres: [],
        actors: [],
        cinemas: [],
        userVote: 0,
        averageVote: 0
      },
      {
        id: 2,
        title: 'Movie 2',
        summary: 'Summary 2',
        onCinemas: true,
        releaseDate: new Date(),
        trailer: 'trailer2.mp4',
        poster: 'poster2.jpg',
        genres: [],
        actors: [],
        cinemas: [],
        userVote: 0,
        averageVote: 0
      }
    ];

    component.movies = movies;
    fixture.detectChanges();

    const movieElements = fixture.debugElement.queryAll(By.css('.movie-container'));

    expect(movieElements.length).toBe(2);

    movieElements.forEach((movieElement, index) => {
      const imgElement = movieElement.query(By.css('img'));
      const titleElement = movieElement.query(By.css('.title'));

      expect(imgElement.nativeElement.src).toContain(movies[index].poster);
      expect(titleElement.nativeElement.textContent).toContain(movies[index].title);
    });
  });


  xit('should not emit event when delete button is clicked and confirmation is cancelled', () => {
    const deleteButton = fixture.debugElement.query(By.css('button'));
    const emitSpy = spyOn(component.deleted, 'emit');
    spyOn(window, 'confirm').and.returnValue(false);

    deleteButton.triggerEventHandler('click', null);

    expect(moviesService.delete).not.toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should handle empty movies list', () => {
    const movieElements = fixture.debugElement.queryAll(By.css('.movie-container'));
    expect(movieElements.length).toBe(0);
  });
});

