import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityService } from '../../../services/security/security.service';
import { AuthorizedComponent } from './authorized.component';
import { Component } from '@angular/core';

@Component({
  template: `
    <app-authorized [role]="role">
      <div authorized>Authorized Content</div>
      <div noAuthorized>Not Authorized Content</div>
    </app-authorized>
  `
})
class TestHostComponent {
  role!: string;
}

describe('AuthorizedComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let securityServiceSpy: jasmine.SpyObj<SecurityService>;

  beforeEach(async () => {
    const securityServiceSpyObj = jasmine.createSpyObj('SecurityService', ['getRole', 'isLogged']);

    await TestBed.configureTestingModule({
      declarations: [TestHostComponent, AuthorizedComponent],
      providers: [{ provide: SecurityService, useValue: securityServiceSpyObj }]
    }).compileComponents();

    securityServiceSpy = TestBed.inject(SecurityService) as jasmine.SpyObj<SecurityService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });

  it('should call SecurityService.getRole() when role is provided', () => {
    const testRole = 'admin';
    testHost.role = testRole;
    securityServiceSpy.getRole.and.returnValue(testRole);
    fixture.detectChanges();
    expect(securityServiceSpy.getRole).toHaveBeenCalled();
  });

  it('should call SecurityService.isLogged() when role is not provided', () => {
    securityServiceSpy.isLogged.and.returnValue(true);
    fixture.detectChanges();
    expect(securityServiceSpy.isLogged).toHaveBeenCalled();
  });

  it('should render authorized content if user is authorized', () => {
    securityServiceSpy.isLogged.and.returnValue(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[authorized]')).toBeTruthy();
    expect(compiled.querySelector('[noAuthorized]')).toBeFalsy();
  });

  it('should render not authorized content if user is not authorized', () => {
    securityServiceSpy.isLogged.and.returnValue(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('[authorized]')).toBeFalsy();
    expect(compiled.querySelector('[noAuthorized]')).toBeTruthy();
  });
});
