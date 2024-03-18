import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GenresService } from './genres.service';
import { genreDTO, genresCreationDTO } from '../../interfaces/genres/genres';

describe('GenresService', () => {
  let service: GenresService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GenresService]
    });
    service = TestBed.inject(GenresService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get paginated genres', () => {
    const page = 1;
    const recordsPerPage = 10;

    service.getPaginated(page, recordsPerPage).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['getApiURL']()}?page=${page}&recordsPerPage=${recordsPerPage}`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should get all genres', () => {
    service.getAll().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['getApiURL']()}/all`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should get genre by id', () => {
    const genreId = 1;
    service.getById(genreId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['getApiURL']()}/${genreId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should add a genre', () => {
    const genre: genresCreationDTO = {
      name: 'Action'
    };

    service.add(genre).subscribe(() => { });

    const req = httpMock.expectOne(service['getApiURL']());
    expect(req.request.method).toBe('POST');
    expect(req.request.body.name).toBe(genre.name);
    req.flush(null);
  });

  it('should edit a genre', () => {
    const genreId = 1;
    const genre: genresCreationDTO = {
      name: 'Drama'
    };

    service.edit(genreId, genre).subscribe(() => { });

    const req = httpMock.expectOne(`${service['getApiURL']()}/${genreId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.name).toBe(genre.name);
    req.flush(null);
  });

  it('should delete a genre', () => {
    const genreId = 1;

    service.deleteGenre(genreId).subscribe(() => { });
    const req = httpMock.expectOne(`${service['getApiURL']()}/${genreId}`);

    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

});
