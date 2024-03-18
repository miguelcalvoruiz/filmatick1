import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EditActorComponent } from './edit-actor.component';
import { ActorsService } from '../../../services/actors/actors.service';

describe('EditActorComponent', () => {
  let component: EditActorComponent;
  let fixture: ComponentFixture<EditActorComponent>;
  let actorsService: jasmine.SpyObj<ActorsService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const actorsServiceSpy = jasmine.createSpyObj('ActorsService', ['getById', 'edit']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {
      params: of({ id: 1 }) // Mock ActivatedRoute with id parameter
    };

    await TestBed.configureTestingModule({
      declarations: [ EditActorComponent ],
      providers: [
        { provide: ActorsService, useValue: actorsServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActorComponent);
    component = fixture.componentInstance;
    actorsService = TestBed.inject(ActorsService) as jasmine.SpyObj<ActorsService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load actor data on init', () => {
    const actorData = { id: 1, name: 'John Doe', birthdate: new Date(), photo: 'photo.jpg', biography: 'Bio' };
    actorsService.getById.and.returnValue(of(actorData));

    fixture.detectChanges();

    expect(actorsService.getById).toHaveBeenCalledOnceWith(1);
    expect(component.model).toEqual(actorData);
  });

  it('should handle error and navigate when failing to load actor data on init', () => {
    const errorResponse = 'Error';
    actorsService.getById.and.returnValue(throwError(errorResponse));

    fixture.detectChanges();

    expect(actorsService.getById).toHaveBeenCalledOnceWith(1);
    expect(router.navigate).toHaveBeenCalledWith(['/actors']);
  });

  it('should save changes successfully', () => {
    const actor: any = { name: 'John Doe', birthdate: new Date(), photo: 'photo.jpg', biography: 'Bio' };
    actorsService.edit.and.returnValue(of(null as any)); // Change null to null as any

    component.saveChanges(actor);

    expect(actorsService.edit).toHaveBeenCalledWith(component.model.id, actor);
    expect(router.navigate).toHaveBeenCalledWith(['/actors']);
    expect(component.errors.length).toBe(0);
  });

  it('should handle errors when saving changes', () => {
    const actor: any = { name: 'John Doe', birthdate: new Date(), photo: 'photo.jpg', biography: 'Bio' };
    const errorResponse = { error: 'Invalid actor data' };
    actorsService.edit.and.returnValue(throwError(errorResponse));

    component.saveChanges(actor);

    expect(actorsService.edit).toHaveBeenCalledWith(component.model.id, actor);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.errors).toEqual(['Invalid actor data']);
  });
});
