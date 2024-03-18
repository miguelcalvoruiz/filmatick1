import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CinemasService } from '../../../services/cinemas/cinemas.service';
import { EditCinemaComponent } from '../../cinema/edit-cinema/edit-cinema.component';
import { cinemaDTO } from 'src/app/interfaces/cinemas/cinema';
import { HttpClientModule } from '@angular/common/http';

describe('EditCinemaComponent', () => {
  let component: EditCinemaComponent;
  let fixture: ComponentFixture<EditCinemaComponent>;
  let cinemasService: jasmine.SpyObj<CinemasService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const cinemasServiceSpy = jasmine.createSpyObj('CinemasService', ['getById', 'edit']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      snapshot: { paramMap: { get: () => '1' } } // Mock ActivatedRoute snapshot with paramMap
    };

    await TestBed.configureTestingModule({
      declarations: [ EditCinemaComponent ],
      providers: [
        { provide: CinemasService, useValue: cinemasServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], // Asegúrate de importar HttpClientModule aquí
      providers: [CinemasService], // Asegúrate de proporcionar cualquier otro servicio necesario
      declarations: [EditCinemaComponent]
    }).compileComponents();
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCinemaComponent);
    component = fixture.componentInstance;
    cinemasService = TestBed.inject(CinemasService) as jasmine.SpyObj<CinemasService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cinema data on init', () => {
    const cinemaData: cinemaDTO = { id: 1, name: 'Cinema Name', latitude: 0, longitude: 0 };
    cinemasService.getById.and.returnValue(of(cinemaData as any));

    fixture.detectChanges();

    expect(cinemasService.getById).toHaveBeenCalledOnceWith(1);
    expect(component.model).toEqual(cinemaData);
  });

  it('should handle error and navigate when failing to load cinema data on init', () => {
    const errorResponse = 'Error';
    cinemasService.getById.and.returnValue(throwError(errorResponse));

    fixture.detectChanges();

    expect(cinemasService.getById).toHaveBeenCalledOnceWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/cinemas']);
  });

  it('should save changes successfully', () => {
    const cinema: any = { name: 'Cinema Name', location: 'Location', capacity: 100 };
    cinemasService.edit.and.returnValue(of(null as any)); // Change null to null as any

    component.saveChanges(cinema);

    expect(cinemasService.edit).toHaveBeenCalledWith(1, cinema);
    expect(router.navigate).toHaveBeenCalledWith(['/cinemas']);
    expect(component.errors.length).toBe(0);
  });

  it('should handle errors when saving changes', () => {
    const cinema: any = { name: 'Cinema Name', location: 'Location', capacity: 100 };
    const errorResponse = { error: 'Invalid cinema data' };
    cinemasService.edit.and.returnValue(throwError(errorResponse));

    component.saveChanges(cinema);

    expect(cinemasService.edit).toHaveBeenCalledWith(1, cinema);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.errors).toEqual(['Invalid cinema data']);
  });
});
