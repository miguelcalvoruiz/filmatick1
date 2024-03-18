import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EditGenreComponent } from './edit-genre.component';
import { GenresService } from '../../../services/genres/genres.service';
import { genresCreationDTO, genreDTO } from '../../../interfaces/genres/genres';

describe('EditGenreComponent', () => {
  let component: EditGenreComponent;
  let fixture: ComponentFixture<EditGenreComponent>;
  let genresService: jasmine.SpyObj<GenresService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;
  const mockGenre: genreDTO = { id: 1, name: 'Test Genre' };

  beforeEach(async () => {
    const genresServiceSpy = jasmine.createSpyObj('GenresService', ['getById', 'edit']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [EditGenreComponent],
      providers: [
        { provide: GenresService, useValue: genresServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }
      ]
    }).compileComponents();

    genresService = TestBed.inject(GenresService) as jasmine.SpyObj<GenresService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGenreComponent);
    component = fixture.componentInstance;
    genresService.getById.and.returnValue(of(mockGenre));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load genre on init', () => {
    expect(genresService.getById).toHaveBeenCalledWith(1);
    expect(component.model).toEqual(mockGenre);
  });

  it('should save changes successfully', () => {
    const genreDTO: genresCreationDTO = { name: 'Updated Genre' };
    genresService.edit.and.returnValue(of(null as any));

    component.saveChanges(genreDTO);

    expect(genresService.edit).toHaveBeenCalledWith(mockGenre.id, genreDTO);
    expect(router.navigate).toHaveBeenCalledWith(['/genres']);
  });

  it('should handle error when saving changes', () => {
    const errorResponse = { error: 'Error saving genre' };
    genresService.edit.and.returnValue(throwError(errorResponse));

    component.saveChanges({ name: 'Updated Genre' });

    expect(component.errors).toEqual(['Error saving genre']);
  });
});
