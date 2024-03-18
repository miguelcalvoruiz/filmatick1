import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectorMultipleComponent } from './selector-multiple.component';
import { MultipleSelectorModel } from '../../interfaces/selector-multiple/multipleSelectorModel';

describe('SelectorMultipleComponent', () => {
  let component: SelectorMultipleComponent;
  let fixture: ComponentFixture<SelectorMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select all unselected items', () => {
    const unselectedItems: MultipleSelectorModel[] = [
      { key: 1, value: 'Action' },
      { key: 2, value: 'Adventure' },
      { key: 3, value: 'Comedy' }
    ];
    component.unselected = unselectedItems;
    component.selectAll();
    expect(component.selected.length).toEqual(unselectedItems.length);
    expect(component.unselected.length).toEqual(0);
  });

  it('should unselect all selected items', () => {
    const selectedItems: MultipleSelectorModel[] = [
      { key: 1, value: 'Action' },
      { key: 2, value: 'Adventure' },
      { key: 3, value: 'Comedy' }
    ];
    component.selected = selectedItems;
    component.unselectAll();
    expect(component.unselected.length).toEqual(selectedItems.length);
    expect(component.selected.length).toEqual(0);
  });

  it('should select a specific item', () => {
    const unselectedItem: MultipleSelectorModel = { key: 1, value: 'Action' };
    component.select(unselectedItem, 0);
    expect(component.selected.length).toEqual(1);
    expect(component.unselected.length).toEqual(0);
  });

  it('should unselect a specific item', () => {
    const selectedItem: MultipleSelectorModel = { key: 1, value: 'Action' };
    component.selected = [selectedItem];
    component.unselect(selectedItem, 0);
    expect(component.unselected.length).toEqual(1);
    expect(component.selected.length).toEqual(0);
  });
});
