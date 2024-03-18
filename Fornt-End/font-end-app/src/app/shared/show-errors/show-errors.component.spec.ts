import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowErrorsComponent } from './show-errors.component';

describe('ShowErrorsComponent', () => {
  let component: ShowErrorsComponent;
  let fixture: ComponentFixture<ShowErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display errors when there are errors', () => {
    const errors = ['Error 1', 'Error 2', 'Error 3'];
    component.errors = errors;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const errorListItems = compiled.querySelectorAll('li');
    expect(errorListItems.length).toEqual(errors.length);
    errorListItems.forEach((item: HTMLElement, index: number) => {
      expect(item.textContent).toContain(errors[index]);
    });
  });

  it('should not display errors when there are no errors', () => {
    const compiled = fixture.nativeElement;
    const errorListItems = compiled.querySelectorAll('li');
    expect(errorListItems.length).toEqual(0);
  });
});
