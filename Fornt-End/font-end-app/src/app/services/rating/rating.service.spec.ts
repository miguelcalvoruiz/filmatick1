import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RatingService } from './rating.service';
import { environment } from 'src/environments/environment';

describe('RatingService', () => {
  let service: RatingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RatingService]
    });
    service = TestBed.inject(RatingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call httpClient.post with correct arguments when rating a movie', () => {
    const movieId = 1;
    const score = 5;

    service.rate(movieId, score).subscribe();

    const req = httpMock.expectOne(service['getApiURL']());
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ movieId, score });
  });
});
