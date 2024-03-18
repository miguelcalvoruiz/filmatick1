import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesDetailComponent } from './movies-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MovieDTO } from '../../../interfaces/movies/movie';
import { DomSanitizer } from '@angular/platform-browser';
import { RatingService } from './../../../services/rating/rating.service';
import Swal from 'sweetalert2';
import { MoviesService } from 'src/app/services/movies/movies.service';

describe('MoviesDetailComponent', () => {
  let component: MoviesDetailComponent;
  let fixture: ComponentFixture<MoviesDetailComponent>;
  let activatedRoute: ActivatedRoute;
  let sanitizer: DomSanitizer;
  let ratingService: RatingService;
  let moviesServiceMock: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    moviesServiceMock = jasmine.createSpyObj('MoviesService', ['getById']);

    await TestBed.configureTestingModule({
      declarations: [MoviesDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 })
          }
        },
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustResourceUrl: (url: string) => url
          }
        },
        {
          provide: RatingService,
          useValue: {
            rate: () => of(null)
          }
        },
        {
          provide: MoviesService,
          useValue: moviesServiceMock
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDetailComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    sanitizer = TestBed.inject(DomSanitizer);
    ratingService = TestBed.inject(RatingService);
    spyOn(activatedRoute.params, 'subscribe').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie data on init', () => {
    const mockMovie: MovieDTO = {
      id: 1,
      title: 'Test Movie',
      summary: 'This is a test movie',
      onCinemas: true,
      releaseDate: new Date(),
      trailer: 'https://www.youtube.com/watch?v=123',
      poster: 'poster.jpg',
      genres: [],
      actors: [],
      cinemas: [],
      userVote: 0,
      averageVote: 0
    };

    const expectedTrailerURL = component.generateURLYoutubeEmbed(mockMovie.trailer);

    moviesServiceMock.getById.and.returnValue(of(mockMovie));
    component.ngOnInit();
    expect(component.movie).toEqual(mockMovie);
    expect(component.releaseDate).toEqual(mockMovie.releaseDate);
    expect(component.trailerURL).toEqual(expectedTrailerURL);
    expect(component.coordinates).toEqual([]);
  });

  it('should rate movie successfully', () => {
    spyOn(ratingService, 'rate').and.returnValue(of(null as any));
    spyOn(Swal, 'fire').and.stub();
    component.movie = { id: 1 } as MovieDTO;
    component.rated(5);
    expect(ratingService.rate).toHaveBeenCalledWith(1, 5);
    expect(Swal.fire).toHaveBeenCalledWith('Exitoso', 'Su voto ha sido recibido', 'success');
  });
});
