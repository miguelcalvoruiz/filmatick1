import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { genresCreationDTO } from 'src/app/interfaces/genres/genres';
import { GenresService } from 'src/app/services/genres/genres.service';
import { AddGenresComponent } from './add-genres.component';

describe('AddGenresComponent', () => {
  let component: AddGenresComponent;
  let fixture: ComponentFixture<AddGenresComponent>;
  let genresService: jasmine.SpyObj<GenresService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const genresServiceSpy = jasmine.createSpyObj('GenresService', ['add']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [AddGenresComponent],
      providers: [
        { provide: GenresService, useValue: genresServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    genresService = TestBed.inject(GenresService) as jasmine.SpyObj<GenresService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save genre changes successfully', () => {
    const genre: genresCreationDTO = { name: 'Action' };

    genresService.add.and.returnValue(of(null as any));

    component.saveChanges(genre);

    expect(genresService.add).toHaveBeenCalledWith(genre);
    expect(router.navigate).toHaveBeenCalledWith(['/genres']);
    expect(component.errors.length).toBe(0);
  });

  it('should handle error when saving genre changes', () => {
    const genre: genresCreationDTO = { name: 'Horror' };
    const errorMessage = 'Error saving genre';

    genresService.add.and.returnValue(throwError(errorMessage));

    component.saveChanges(genre);

    expect(genresService.add).toHaveBeenCalledWith(genre);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.errors).toEqual([errorMessage]);
  });
});
