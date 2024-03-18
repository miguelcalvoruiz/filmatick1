import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexCinemaComponent } from './index-cinema.component';
import { CinemasService } from '../../../services/cinemas/cinemas.service';
import { of } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator } from '@angular/material/paginator';
import { cinemaDTO } from 'src/app/interfaces/cinemas/cinema';

describe('IndexCinemaComponent', () => {
  let component: IndexCinemaComponent;
  let fixture: ComponentFixture<IndexCinemaComponent>;
  let cinemasService: jasmine.SpyObj<CinemasService>;

  beforeEach(async () => {
    cinemasService = jasmine.createSpyObj('CinemasService', ['getAll', 'deleteCinema']);

    await TestBed.configureTestingModule({
      declarations: [IndexCinemaComponent],
      imports: [MatPaginatorModule, MatIconModule, BrowserAnimationsModule],
      providers: [{ provide: CinemasService, useValue: cinemasService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCinemaComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cinemas on init', () => {
    const mockCinemas: cinemaDTO[] = [
        { id: 1, name: 'Cinema 1', latitude: 0, longitude: 0 },
        { id: 2, name: 'Cinema 2', latitude: 0, longitude: 0 }
    ];
    const mockResponse = {
        body: mockCinemas,
        headers: { get: () => '2' } // Mocking quantityTotalRecords header
    };
    cinemasService.getAll.and.returnValue(of(mockResponse));

    fixture.detectChanges();

    expect(component.cinemas).toEqual(mockCinemas);
    expect(component.quantityTotalRecords).toEqual(2);
});


  it('should update pagination', () => {
    const mockPageEvent = { pageIndex: 1, pageSize: 10 } as MatPaginator;
    component.loadRecords = jasmine.createSpy('loadRecords');

    component.updatePagination(mockPageEvent);

    expect(component.actualPage).toEqual(2);
    expect(component.quantityRecordsToShow).toEqual(10);
    expect(component.loadRecords).toHaveBeenCalledWith(2, 10);
  });

  it('should delete cinema', () => {
    const cinemaId = 1;
    cinemasService.deleteCinema.and.returnValue(of(null as any));
    component.loadRecords = jasmine.createSpy('loadRecords');

    component.deleteCinema(cinemaId);

    expect(cinemasService.deleteCinema).toHaveBeenCalledWith(cinemaId);
    expect(component.loadRecords).toHaveBeenCalled();
  });
});
