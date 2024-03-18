import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { MoviesService } from '../../services/movies/movies.service';
import { of } from 'rxjs';
import { LandingPageDTO, MovieDTO } from '../../interfaces/movies/movie';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getLandingPage']);
    
    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      providers: [{ provide: MoviesService, useValue: moviesServiceSpy }]
    })
    .compileComponents();

    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    const landingPage: LandingPageDTO = {
      onCinemas: [{ id: 1, title: 'Movie 1', summary: 'Summary 1', onCinemas: true, releaseDate: new Date(), trailer: '', poster: '', genres: [], actors: [], cinemas: [], userVote: 0, averageVote: 0 }],
      nextReleases: [{ id: 2, title: 'Movie 2', summary: 'Summary 2', onCinemas: false, releaseDate: new Date(), trailer: '', poster: '', genres: [], actors: [], cinemas: [], userVote: 0, averageVote: 0 }]
    };
    moviesService.getLandingPage.and.returnValue(of(landingPage));

    fixture.detectChanges();

    expect(component.moviesOnCinemas).toEqual(landingPage.onCinemas);
    expect(component.moviesUpcoming).toEqual(landingPage.nextReleases);
  });

  it('should reload movies after deletion', () => {
    const landingPage: LandingPageDTO = {
      onCinemas: [{ id: 1, title: 'Movie 1', summary: 'Summary 1', onCinemas: true, releaseDate: new Date(), trailer: '', poster: '', genres: [], actors: [], cinemas: [], userVote: 0, averageVote: 0 }],
      nextReleases: [{ id: 2, title: 'Movie 2', summary: 'Summary 2', onCinemas: false, releaseDate: new Date(), trailer: '', poster: '', genres: [], actors: [], cinemas: [], userVote: 0, averageVote: 0 }]
    };
    moviesService.getLandingPage.and.returnValue(of(landingPage));

    // Simular la eliminación de una película
    component.deleted();

    expect(component.moviesOnCinemas).toEqual(landingPage.onCinemas);
    expect(component.moviesUpcoming).toEqual(landingPage.nextReleases);
  });
});
