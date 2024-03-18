import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityInterceptorService } from './security-interceptor.service';
import { SecurityService } from './security.service';

describe('SecurityInterceptorService', () => {
  let interceptor: SecurityInterceptorService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SecurityInterceptorService,
        SecurityService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: SecurityInterceptorService,
          multi: true,
        },
      ],
    });

    interceptor = TestBed.inject(SecurityInterceptorService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header if token is present', () => {
    const token = 'dummy_token';
    spyOn(interceptor['securityService'], 'getToken').and.returnValue(token);

    httpClient.get<any>('https://api.example.com/data').subscribe();

    const req = httpMock.expectOne('https://api.example.com/data');
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);

    req.flush({});
  });

  it('should not add Authorization header if token is not present', () => {
    spyOn(interceptor['securityService'], 'getToken').and.returnValue(null);

    httpClient.get<any>('https://api.example.com/data').subscribe();

    const req = httpMock.expectOne('https://api.example.com/data');
    expect(req.request.headers.has('Authorization')).toBeFalsy();

    req.flush({});
  });
});
