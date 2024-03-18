import { AddActorComponent } from './add-actor.component';
import { ActorsService } from '../../../services/actors/actors.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('AddActorComponent', () => {
  let component: AddActorComponent;
  let actorsService: jasmine.SpyObj<ActorsService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    actorsService = jasmine.createSpyObj('ActorsService', ['addActor']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    component = new AddActorComponent(actorsService, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save changes successfully', () => {
    const actor = { name: 'John Doe', photo: new File([''], 'photo1.jpg'), birthdate: new Date(), biography: 'Biography' };
    actorsService.addActor.and.returnValue(of({}));

    component.saveChanges(actor);

    expect(actorsService.addActor).toHaveBeenCalledWith(actor);
    expect(router.navigate).toHaveBeenCalledWith(['/actors']);
    expect(component.errors.length).toBe(0);
  });

  it('should handle errors when saving changes', () => {
    const actor = { name: 'Jane Doe', photo: new File([''], 'photo2.jpg'), birthdate: new Date(), biography: 'Biography' };
    const errorResponse = { error: 'Invalid actor data' };
    actorsService.addActor.and.returnValue(throwError(errorResponse));

    component.saveChanges(actor);

    expect(actorsService.addActor).toHaveBeenCalledWith(actor);
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.errors).toEqual(['Invalid actor data']);
  });
});
