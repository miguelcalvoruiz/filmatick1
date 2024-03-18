import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { UsersIndexComponent } from './users-index.component';
import { SecurityService } from './../../../services/security/security.service';
import { MatPaginator } from '@angular/material/paginator';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

describe('UsersIndexComponent', () => {
  let component: UsersIndexComponent;
  let fixture: ComponentFixture<UsersIndexComponent>;
  let securityServiceSpy: jasmine.SpyObj<SecurityService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('SecurityService', ['getUsers', 'addAdmin', 'deleteAdmin']);

    await TestBed.configureTestingModule({
      declarations: [ UsersIndexComponent ],
      providers: [
        { provide: SecurityService, useValue: spy }
      ]
    })
    .compileComponents();

    securityServiceSpy = TestBed.inject(SecurityService) as jasmine.SpyObj<SecurityService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersIndexComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', fakeAsync(() => {
    const users: any = [{ id: '1', email: 'test@example.com' }];
    const headers = new HttpHeaders().append('quantityTotalRecords', '1');

    securityServiceSpy.getUsers.and.returnValue(of(new HttpResponse({ body: users, headers })));

    fixture.detectChanges();
    tick();

    expect(securityServiceSpy.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(users);
    expect(component.quantityTotalRecords).toEqual(1);
  }));

  it('should handle empty response when loading users on init', fakeAsync(() => {
    const headers = new HttpHeaders().append('quantityTotalRecords', '0');

    securityServiceSpy.getUsers.and.returnValue(of(new HttpResponse({ headers })));

    fixture.detectChanges();
    tick();

    expect(securityServiceSpy.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual([]);
    expect(component.quantityTotalRecords).toEqual(0);
  }));

  xit('should handle pagination change', fakeAsync(() => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 10 };

    component.updatePagination(pageEvent);
    tick();

    expect(component.actualPage).toEqual(pageEvent.pageIndex + 1);
    expect(component.quantityRecordsToShow).toEqual(pageEvent.pageSize);
    expect(securityServiceSpy.getUsers).toHaveBeenCalledWith(pageEvent.pageIndex + 1, pageEvent.pageSize);
  }));

  xit('should call addAdmin method of SecurityService on addAdmin button click', fakeAsync(() => {
    const userId = '1';
    spyOn(window, 'confirm').and.returnValue(true);
    securityServiceSpy.addAdmin.and.returnValue(of({}));

    fixture.detectChanges();
    component.addAdmin(userId);
    tick();

    expect(securityServiceSpy.addAdmin).toHaveBeenCalledWith(userId);
  }));

  xit('should call deleteAdmin method of SecurityService on deleteAdmin button click', fakeAsync(() => {
    const userId = '1';
    spyOn(window, 'confirm').and.returnValue(true);
    securityServiceSpy.deleteAdmin.and.returnValue(of({}));

    fixture.detectChanges();
    component.deleteAdmin(userId);
    tick();

    expect(securityServiceSpy.deleteAdmin).toHaveBeenCalledWith(userId);
  }));
});
