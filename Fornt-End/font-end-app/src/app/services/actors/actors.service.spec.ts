import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActorsService } from './actors.service';
import { actorCreationDTO } from '../../interfaces/actors/actor';

describe('ActorsService', () => {
  let service: ActorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActorsService]
    });
    service = TestBed.inject(ActorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an actor', () => {
    const actor: actorCreationDTO = {
      name: 'John Doe',
      birthdate: new Date(),
      photo: new File([''], 'test.jpg'),
      biography: 'Test biography'
    };

    service.addActor(actor).subscribe(() => { });

    const req = httpMock.expectOne(service['getApiUrl']());
    expect(req.request.method).toBe('POST');
    expect(req.request.body.get('name')).toBe(actor.name);
    expect(req.request.body.get('birthdate')).toBe(actor.birthdate.toISOString().split('T')[0]);
    expect(req.request.body.get('biography')).toBe(actor.biography);
    expect(req.request.body.get('photo')).toBe(actor.photo);
    req.flush(null);
  });

  it('should get all actors', () => {
    const page = 1;
    const recordsPerPage = 10;

    service.getAll(page, recordsPerPage).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['getApiUrl']()}?page=${page}&recordsPerPage=${recordsPerPage}`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should get actor by id', () => {
    const actorId = 1;
    service.getById(actorId).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['getApiUrl']()}/${actorId}`);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should search actors by name', () => {
    const actorName = 'John Doe';
    service.getByName(actorName).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['getApiUrl']()}/searchByName`);
    expect(req.request.method).toBe('POST');
    expect(JSON.parse(req.request.body)).toBe(actorName);
    req.flush([]);
  });


  it('should edit an actor', () => {
    const actorId = 1;
    const actor: actorCreationDTO = {
      name: 'John Doe',
      birthdate: new Date(),
      photo: new File([''], 'test.jpg'),
      biography: 'Test biography'
    };

    service.edit(actorId, actor).subscribe(() => { });

    const req = httpMock.expectOne(`${service['getApiUrl']()}/${actorId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.get('name')).toBe(actor.name);
    expect(req.request.body.get('birthdate')).toBe(actor.birthdate.toISOString().split('T')[0]);
    expect(req.request.body.get('biography')).toBe(actor.biography);
    expect(req.request.body.get('photo')).toBe(actor.photo);
    req.flush(null);
  });

  it('should delete an actor', () => {
    const actorId = 1;
    service.deleteActor(actorId).subscribe(() => { });

    const req = httpMock.expectOne(`${service['getApiUrl']()}/${actorId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
