import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormCinemaComponent } from './form-cinema.component';
import { By } from '@angular/platform-browser';
import { cinemaCreationDTO } from 'src/app/interfaces/cinemas/cinema';

describe('FormCinemaComponent', () => {
  let component: FormCinemaComponent;
  let fixture: ComponentFixture<FormCinemaComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormCinemaComponent],
      imports: [ReactiveFormsModule],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCinemaComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    spyOn(component.initialCoordinate, 'emit');
    spyOn(component.saveChanges, 'emit');

    fixture.detectChanges();
  });

  it('should initialize form with empty fields and emit empty coordinates', () => {
    expect(component.form.get('name')?.value).toBe('');
    expect(component.form.get('latitude')?.value).toBe('');
    expect(component.form.get('longitude')?.value).toBe('');
    expect(component.initialCoordinate.emit).toHaveBeenCalledWith([]);
  });
  
  it('should update form when selected coordinate is received', () => {
    const coordinate = { latitude: 3, longitude: 4 };
    component.onSelectedCoordinate(coordinate);
    fixture.detectChanges();

    expect(component.form.get('latitude')?.value).toBe(coordinate.latitude);
    expect(component.form.get('longitude')?.value).toBe(coordinate.longitude);
  });

  it('should emit form data on submit', () => {
    const formData = { name: 'Test Cinema', latitude: 1, longitude: 2 };
    component.form.setValue(formData);
    component.onSubmit();

    expect(component.saveChanges.emit).toHaveBeenCalledWith(formData);
  });

  it('should mark form as invalid if required fields are empty', () => {
    component.form.patchValue({ name: '', latitude: '', longitude: '' });
    expect(component.form.invalid).toBeTruthy();
  });

  it('should display error message if name field is empty', () => {
    const nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]'));
    const nameError = fixture.debugElement.query(By.css('mat-error'));
    nameInput.nativeElement.value = '';
    nameInput.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(nameError).toBeTruthy();
    expect(nameError.nativeElement.textContent.trim()).toEqual('El campo nombre es requerido');
  });  
});
