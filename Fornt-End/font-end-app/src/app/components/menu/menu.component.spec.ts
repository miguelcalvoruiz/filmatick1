import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuComponent } from './menu.component';
import { SecurityService } from '../../services/security/security.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importar HttpClientTestingModule
import { of } from 'rxjs';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let securityService: SecurityService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [MatToolbarModule, RouterTestingModule, HttpClientTestingModule], // Usar HttpClientTestingModule
      providers: [SecurityService] // Provide the service
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    securityService = TestBed.inject(SecurityService); // Inject the service
  });

  it('should create', () => {
    spyOn(securityService, 'isLogged').and.returnValue(false); // Modificado para devolver falso por defecto
    spyOn(securityService, 'getFieldJWT').and.returnValue('user@example.com'); // Modificado para devolver un correo electrónico
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display links when user is logged in', () => {
    spyOn(securityService, 'isLogged').and.returnValue(true); // Cambiado para devolver verdadero
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('a[mat-button]');
    expect(links.length).toBeGreaterThan(0);
  });

  it('should display login and register links when user is not logged in', () => {
    spyOn(securityService, 'isLogged').and.returnValue(false); // Cambiado para devolver falso
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const loginLink = compiled.querySelector('a[routerLink="login"]');
    const registerLink = compiled.querySelector('a[routerLink="register"]');
    expect(loginLink).toBeTruthy();
    expect(registerLink).toBeTruthy();
  });
});
