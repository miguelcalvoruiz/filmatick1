import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormMovieComponent } from './form-movie.component';
import { actorMovieDTO } from 'src/app/interfaces/actors/actor';
import { MovieCreationDTO } from 'src/app/interfaces/movies/movie';

describe('FormMovieComponent', () => {
  let component: FormMovieComponent;
  let fixture: ComponentFixture<FormMovieComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMovieComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMovieComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    component.form = formBuilder.group({
      title: ['', Validators.required],
      summary: '',
      onCinemas: [false],
      releaseDate: '',
      trailer: '',
      poster: new File([''], 'dummy.jpg'), // Cambiar 'poster' a un objeto File vacío
      genresIds: '',
      cinemasIds: '',
      actors: ''
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with correct controls', () => {
    expect(component.form instanceof FormGroup).toBe(true);
    expect(component.form.controls['title']).toBeTruthy();
    expect(component.form.controls['summary']).toBeTruthy();
    expect(component.form.controls['onCinemas']).toBeTruthy();
  });

  xit('should emit onSubmit event when saveChanges is called', () => {
    spyOn(component.onSubmit, 'emit');

    const movieCreationDTO: MovieCreationDTO = {
      title: 'Test Movie',
      summary: 'This is a test movie',
      onCinemas: true,
      releaseDate: new Date(),
      trailer: 'test_trailer_url',
      poster: new File([''], 'photo.jpg', { type: 'image/jpeg' }),
      genresIds: [1, 2],
      actors: [],
      cinemasIds: [1, 2]
    };

    component.form.setValue(movieCreationDTO);
    
    // Establecer 'poster' como un objeto File antes de llamar a saveChanges()
    component.form.patchValue({
      poster: movieCreationDTO.poster
    });

    component.saveChanges();

    const expectedFormData: MovieCreationDTO = {
      title: movieCreationDTO.title,
      summary: movieCreationDTO.summary,
      onCinemas: movieCreationDTO.onCinemas,
      releaseDate: movieCreationDTO.releaseDate,
      trailer: movieCreationDTO.trailer,
      poster: movieCreationDTO.poster,
      genresIds: movieCreationDTO.genresIds,
      actors: movieCreationDTO.actors,
      cinemasIds: movieCreationDTO.cinemasIds
    };

    expect(component.onSubmit.emit).toHaveBeenCalledWith(expectedFormData);
  });

  it('should update poster value when fileSelected is called', () => {
    const file = new File([''], 'test.jpg');
    component.fileSelected(file);
    expect(component.form.get('poster')?.value).toEqual(file);
  });

  // Agregar más pruebas para otros métodos/eventos según sea necesario
});
