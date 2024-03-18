import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SecurityService } from '../../../services/security/security.service';
import { Router } from '@angular/router';
import { userCredentials } from '../../../interfaces/security/security';
import { of, throwError } from 'rxjs';
import { parseErrorsAPI } from 'src/app/shared/helpers'; // Importamos la función parseErrorsAPI

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let securityService: jasmine.SpyObj<SecurityService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const securityServiceSpy = jasmine.createSpyObj('SecurityService', ['login', 'saveToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: SecurityService, useValue: securityServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    securityService = TestBed.inject(SecurityService) as jasmine.SpyObj<SecurityService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method of SecurityService on form submission', fakeAsync(() => {
    const credentials: userCredentials = { email: 'test@example.com', password: 'password' };
    securityService.login.and.returnValue(of({ token: 'token', expiration: new Date() }));
    component.login(credentials);
    tick();
    expect(securityService.login).toHaveBeenCalledWith(credentials);
  }));

  it('should save token and navigate to "/" after successful login', fakeAsync(() => {
    const credentials: userCredentials = { email: 'test@example.com', password: 'password' };
    const authenticationResponse = { token: 'token', expiration: new Date() };
    securityService.login.and.returnValue(of(authenticationResponse));
    component.login(credentials);
    tick();
    expect(securityService.saveToken).toHaveBeenCalledWith(authenticationResponse);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should set errors on login failure', fakeAsync(() => {
    const credentials: userCredentials = { email: 'test@example.com', password: 'password' };
    const errorMessage = 'Error desconocido';
    securityService.login.and.returnValue(throwError({ error: { message: errorMessage } })); // Corregimos el objeto de error devuelto
    component.login(credentials);
    tick();
    expect(component.errors).toEqual([errorMessage]); // Verificamos que los errores se establezcan correctamente
  }));  
});
