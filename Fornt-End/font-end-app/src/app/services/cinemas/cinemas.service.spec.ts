import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CinemasService } from './cinemas.service';
import { cinemaCreationDTO, cinemaDTO } from '../../interfaces/cinemas/cinema';

describe('CinemasService', () => {
  let service: CinemasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CinemasService]
    });
    service = TestBed.inject(CinemasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a cinema', () => {
    const cinema: cinemaCreationDTO = {
      name: 'Test Cinema',
      latitude: 0,
      longitude: 0
    };

    service.add(cinema).subscribe(() => { });

    const req = httpMock.expectOne(service['getApiURL']() + 'cinemas');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(cinema);
    req.flush(null);
  });

  it('should get all cinemas', () => {
    const page = 1;
    const recordsPerPage = 10;

    service.getAll(page, recordsPerPage).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['getApiURL']()}cinemas?page=${page}&recordsPerPage=${recordsPerPage}`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should get cinema by id', () => {
    const cinemaId = 1;
    service.getById(cinemaId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['getApiURL']()}cinemas/${cinemaId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should edit a cinema', () => {
    const cinemaId = 1;
    const cinema: cinemaCreationDTO = {
      name: 'Test Cinema',
      latitude: 0,
      longitude: 0
    };

    service.edit(cinemaId, cinema).subscribe(() => { });

    const req = httpMock.expectOne(`${service['getApiURL']()}cinemas/${cinemaId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(cinema);
    req.flush(null);
  });

  it('should delete a cinema', () => {
    const cinemaId = 1;
    service.deleteCinema(cinemaId).subscribe(() => { });

    const req = httpMock.expectOne(`${service['getApiURL']()}cinemas/${cinemaId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
