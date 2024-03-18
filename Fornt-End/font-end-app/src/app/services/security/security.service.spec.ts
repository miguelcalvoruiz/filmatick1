import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SecurityService } from './security.service';
import { authenticationResponse, userCredentials } from '../../interfaces/security/security';

describe('SecurityService', () => {
  let service: SecurityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecurityService]
    });
    service = TestBed.inject(SecurityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return users', () => {
    const page = 1;
    const recordsPerPage = 10;

    service.getUsers(page, recordsPerPage).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${service['getApiURL']()}/userslist?page=${page}&recordsPerPage=${recordsPerPage}`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should add an admin', () => {
    const userId = 'dummyUserId';

    service.addAdmin(userId).subscribe(() => { });

    const req = httpMock.expectOne(`${service['getApiURL']()}/addAdmin`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(JSON.stringify(userId));
    req.flush(null);
  });

  it('should delete an admin', () => {
    const userId = 'dummyUserId';

    service.deleteAdmin(userId).subscribe(() => { });

    const req = httpMock.expectOne(`${service['getApiURL']()}/deleteAdmin`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(JSON.stringify(userId));
    req.flush(null);
  });

  it('should return whether the user is logged in', () => {
    // Test when token and expiration exist and have not expired
    localStorage.setItem('token', 'dummyToken');
    localStorage.setItem('token-expiration', new Date(Date.now() + 1000000).toString());
    expect(service.isLogged()).toBe(true);

    // Test when token and expiration exist but have expired
    localStorage.setItem('token-expiration', new Date(Date.now() - 1000000).toString());
    expect(service.isLogged()).toBe(false);

    // Test when token doesn't exist
    localStorage.removeItem('token');
    expect(service.isLogged()).toBe(false);

    // Test when expiration doesn't exist
    localStorage.setItem('token', 'dummyToken');
    localStorage.removeItem('token-expiration');
    expect(service.isLogged()).toBe(false);
  });
});
