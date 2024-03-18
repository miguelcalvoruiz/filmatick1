import { AutocompleteActorsComponent } from './autocomplete-actors.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatTable } from '@angular/material/table';
import { ActorsService } from 'src/app/services/actors/actors.service';

describe('AutocompleteActorsComponent', () => {
  let component: AutocompleteActorsComponent;
  let fixture: ComponentFixture<AutocompleteActorsComponent>;
  let mockActorsService: any;

  beforeEach(() => {
    mockActorsService = jasmine.createSpyObj('ActorsService', ['getByName']);
    TestBed.configureTestingModule({
      declarations: [AutocompleteActorsComponent],
      imports: [MatTableModule],
      providers: [
        { provide: ActorsService, useValue: mockActorsService }
      ]
    });
    fixture = TestBed.createComponent(AutocompleteActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getByName method when control value changes', () => {
    const mockActors = [{ id: 1, name: 'Actor 1', photo: 'photo1.jpg', character: 'Character 1' }];
    mockActorsService.getByName.and.returnValue(of(mockActors));

    component.control.patchValue('Actor 1');

    expect(mockActorsService.getByName).toHaveBeenCalledWith('Actor 1');
    expect(component.actorsToShow).toEqual(mockActors);
  });

  it('should add selected actor when optionSelected is called', () => {
    const mockActor = { id: 1, name: 'Actor 1', photo: 'photo1.jpg', character: 'Character 1' };
    const mockEvent: MatAutocompleteSelectedEvent = {
      option: {
        value: mockActor
      } as any,
      source: {} as any
    };

    component.optionSelected(mockEvent);

    expect(component.actorsSelected).toContain(mockActor);
  });

  it('should delete actor from actorsSelected when delete is called', () => {
    const mockActor = { id: 1, name: 'Actor 1', photo: 'photo1.jpg', character: 'Character 1' };
    component.actorsSelected = [mockActor];

    component.delete(mockActor);

    expect(component.actorsSelected).not.toContain(mockActor);
  });

  it('should reorder actorsSelected array when endDrag is called', () => {
    const mockActor1 = { id: 1, name: 'Actor 1', photo: 'photo1.jpg', character: 'Character 1' };
    const mockActor2 = { id: 2, name: 'Actor 2', photo: 'photo2.jpg', character: 'Character 2' };
    component.actorsSelected = [mockActor1, mockActor2];

    const mockItem = { id: 1, name: 'Actor 1', photo: 'photo1.jpg', character: 'Character 1' };

    component.endDrag({ item: mockItem, currentIndex: 1, previousIndex: 0 } as any);

    expect(component.actorsSelected).toEqual([mockActor2, mockActor1]);
  });
});
