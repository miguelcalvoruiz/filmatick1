import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationFormComponent } from './authentication-form.component';

describe('AuthenticationFormComponent', () => {
  let component: AuthenticationFormComponent;
  let fixture: ComponentFixture<AuthenticationFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationFormComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors: any = {};
    const email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();
  
    // Required field validation
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  
    // Set email to valid email
    email.setValue('test@example.com'); // Agregamos un email válido
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy(); // Debería pasar la validación requerida
    expect(errors['email']).toBeFalsy(); // No debería haber error de email
    expect(email.valid).toBeTruthy(); // El campo debería ser válido
  });
  
  it('password field validity', () => {
    let errors: any = {};
    const password = component.form.controls['password'];
    expect(password.valid).toBeFalsy();
  
    // Required field validation
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  
    // Set password to non-empty value
    password.setValue('123456'); // Asignamos un valor no vacío
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy(); // Debería pasar la validación requerida
    expect(password.valid).toBeTruthy(); // El campo debería ser válido
  });
  

  it('getErrorMessageEmail() should return correct message', () => {
    const email = component.form.controls['email'];

    // Test when email is required
    email.setValue('');
    expect(component.getErrorMessageEmail()).toBe('El campo Email es requerido');

    // Test when email is invalid
    email.setValue('invalidemail');
    expect(component.getErrorMessageEmail()).toBe('El Email no es valido');

    // Test when email is valid
    email.setValue('test@example.com');
    expect(component.getErrorMessageEmail()).toBe('');
  });
});
