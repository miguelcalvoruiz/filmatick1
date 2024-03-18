import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { RatingComponent } from './rating.component';
import { SecurityService } from '../../services/security/security.service';
import Swal from 'sweetalert2';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  let securityServiceSpy: jasmine.SpyObj<SecurityService>;

  beforeEach(async () => {
    const securitySpy = jasmine.createSpyObj('SecurityService', ['isLogged']);

    await TestBed.configureTestingModule({
      declarations: [RatingComponent],
      imports: [MatIconModule],
      providers: [{ provide: SecurityService, useValue: securitySpy }]
    }).compileComponents();

    securityServiceSpy = TestBed.inject(SecurityService) as jasmine.SpyObj<SecurityService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight stars on mouse enter', () => {
    const stars = fixture.debugElement.queryAll(By.css('.mat-icon'));

    for (let i = 0; i < stars.length; i++) {
      stars[i].triggerEventHandler('mouseenter', null);
      fixture.detectChanges();
      expect(stars[i].nativeElement.classList).toContain('checked');
    }
  });

  it('should remove highlight on mouse leave if no rating is set', () => {
    spyOn(component, 'manageMouseLeave');
    component.manageMouseEnter(0); // Simulate mouseenter event
    component.manageMouseLeave(); // Simulate mouseleave event
  
    expect(component.manageMouseLeave).toHaveBeenCalled();
  });
  
  it('should set rating on mouse leave if rating is set', () => {
    spyOn(component, 'manageMouseLeave');
    component.ratingSelected = 3;
    component.manageMouseEnter(0); // Simulate mouseenter event
    component.manageMouseLeave(); // Simulate mouseleave event
  
    expect(component.manageMouseLeave).toHaveBeenCalled();
  });
  

  it('should rate when clicked if user is logged in', fakeAsync(() => {
    securityServiceSpy.isLogged.and.returnValue(true);
    spyOn(component.rated, 'emit');
    const stars = fixture.debugElement.queryAll(By.css('.mat-icon'));

    stars[3].triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();

    expect(component.rated.emit).toHaveBeenCalledWith(4);
  }));

  it('should not rate when clicked if user is not logged in', () => {
    securityServiceSpy.isLogged.and.returnValue(false);
    spyOn(Swal, 'fire');
    const stars = fixture.debugElement.queryAll(By.css('.mat-icon'));

    stars[3].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(Swal.fire).toHaveBeenCalledOnceWith('Debe Loguearse', 'No puede realizar esta accion', 'error');
  });
});
