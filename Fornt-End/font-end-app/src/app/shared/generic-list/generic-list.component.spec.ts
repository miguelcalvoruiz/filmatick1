import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GenericListComponent } from './generic-list.component';

describe('GenericListComponent', () => {
  let component: GenericListComponent;
  let fixture: ComponentFixture<GenericListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty message when list is empty', () => {
    component.list = [];
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('p'));
    expect(emptyMessage.nativeElement.textContent.trim()).toContain('No hay películas para mostrar');
  });

  it('should display custom empty message if provided', () => {
    component.list = [];
    fixture.detectChanges();

    const emptyMessage = fixture.debugElement.query(By.css('p'));
    expect(emptyMessage.nativeElement.textContent.trim()).toContain('No hay películas para mostrar');

    // Change the content of the empty message
    component.list = [];
    fixture.detectChanges();

    expect(emptyMessage.nativeElement.textContent.trim()).toContain('No hay películas para mostrar');
  });
});
