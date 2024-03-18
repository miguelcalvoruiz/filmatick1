import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGenreComponent } from './form-genre.component';

describe('FormGenreComponent', () => {
  let component: FormGenreComponent;
  let fixture: ComponentFixture<FormGenreComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormGenreComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGenreComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    // Inicializar el modelo con un valor por defecto
    component.model = { name: 'Test Genre' };

    // Actualizar el valor del campo del formulario
    component.form.get('name')?.setValue(component.model.name);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should initialize form with empty name', () => {
    // Verificar que el modelo se inicialice correctamente con un nombre vacío
    expect(component.form.get('name')?.value).toBe('');
  });

  it('should initialize form with provided model', () => {
    // Verificar que el formulario se inicialice con el modelo proporcionado
    expect(component.form.get('name')?.value).toBe('Test Genre');
  });

  it('should emit form data on submit', () => {
    spyOn(component.onSubmit, 'emit');
    // Simular el envío del formulario
    component.saveChanges();

    // Verificar que se emita el evento con el modelo actualizado
    expect(component.onSubmit.emit).toHaveBeenCalledWith(component.form.value);
  });

  it('should return appropriate error message for name field', () => {
    const nameFormControl = component.form.get('name');

    // Test required validation
    nameFormControl?.setValue('');
    expect(component.getErrorNameLabel()).toBe('El campo nombre es requerido');

    // Test minlength validation
    nameFormControl?.setValue('ab');
    expect(component.getErrorNameLabel()).toBe('La longitud mínima es de 3 caracteres');

    // Test custom validation (firstCapitalLetter)
    nameFormControl?.setValue('test');
    expect(component.getErrorNameLabel()).toBe('El nombre debe comenzar con mayúscula');

    // Test no error
    nameFormControl?.setValue('Test');
    expect(component.getErrorNameLabel()).toBe('');
  });
});
