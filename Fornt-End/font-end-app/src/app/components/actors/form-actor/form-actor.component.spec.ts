import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormActorComponent } from './form-actor.component';
import { actorCreationDTO, actorDTO } from '../../../interfaces/actors/actor';

describe('FormActorComponent', () => {
  let component: FormActorComponent;
  let fixture: ComponentFixture<FormActorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormActorComponent],
      providers: [FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.form).toBeDefined();
    expect(component.form.controls['name']).toBeDefined();
    expect(component.form.controls['birthdate']).toBeDefined();
    expect(component.form.controls['photo']).toBeDefined();
    expect(component.form.controls['biography']).toBeDefined();
  });

  it('should initialize the form with model data', () => {
    const formBuilder = TestBed.inject(FormBuilder);
    const actorModel: actorDTO = {
      id: 1,
      name: 'John Doe',
      birthdate: new Date(),
      photo: 'photo.jpg',
      biography: 'Actor biography'
    };

    const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });

    component.model = actorModel;
    component.ngOnInit();

    component.form.patchValue({
      photo: file
    });

    const expectedFormData: actorCreationDTO = {
      name: actorModel.name,
      birthdate: actorModel.birthdate,
      photo: file,
      biography: actorModel.biography
    };
    expect(component.form.value).toEqual(expectedFormData);
  });


  it('should emit onSubmit event when saveChanges is called', () => {
    const blob = new Blob([], { type: 'image/jpeg' });
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

    const actorData: actorCreationDTO = {
      name: 'John Doe',
      birthdate: new Date(),
      photo: file,
      biography: 'Actor biography'
    };
    const emitterSpy = spyOn(component.onSubmit, 'emit');
    component.form.setValue(actorData);
    component.saveChanges();
    expect(emitterSpy).toHaveBeenCalledWith(actorData);
  });


  it('should update photo control value when fileSelected is called', () => {
    const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });
    component.fileSelected(file);
    expect(component.form.get('photo')?.value).toEqual(file);
  });

  it('should update biography control value when saveMarkdown is called', () => {
    const markdownText = 'Actor biography';
    component.saveMarkdown(markdownText);
    expect(component.form.get('biography')?.value).toEqual(markdownText);
  });
});
