import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { SecurityService } from '../../../services/security/security.service';
import { Router } from '@angular/router';
import { userCredentials } from '../../../interfaces/security/security';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let securityService: jasmine.SpyObj<SecurityService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const securityServiceSpy = jasmine.createSpyObj('SecurityService', ['register', 'saveToken']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call register method of SecurityService on form submission', fakeAsync(() => {
    const credentials: userCredentials = { email: 'test@example.com', password: 'password' };
    securityService.register.and.returnValue(of({ token: 'token', expiration: new Date() }));
    component.register(credentials);
    tick();
    expect(securityService.register).toHaveBeenCalledWith(credentials);
  }));

  it('should save token and navigate to "/" after successful registration', fakeAsync(() => {
    const credentials: userCredentials = { email: 'test@example.com', password: 'password' };
    const authenticationResponse = { token: 'token', expiration: new Date() };
    securityService.register.and.returnValue(of(authenticationResponse));
    component.register(credentials);
    tick();
    expect(securityService.saveToken).toHaveBeenCalledWith(authenticationResponse);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('should set errors on registration failure', fakeAsync(() => {
    const credentials: userCredentials = { email: 'test@example.com', password: 'password' };
    const errorMessage = 'Error desconocido';
    securityService.register.and.returnValue(throwError({ error: { message: errorMessage } }));
    component.register(credentials);
    tick();
    expect(component.errors).toEqual([errorMessage]);
  }));  
});
