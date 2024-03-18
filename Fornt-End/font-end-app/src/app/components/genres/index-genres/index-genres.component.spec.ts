import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndexGenresComponent } from './index-genres.component';
import { GenresService } from '../../../services/genres/genres.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator } from '@angular/material/paginator';

describe('IndexGenresComponent', () => {
  let component: IndexGenresComponent;
  let fixture: ComponentFixture<IndexGenresComponent>;
  let genresService: GenresService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexGenresComponent],
      imports: [
        HttpClientTestingModule,
        MatPaginatorModule,
        MatTableModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexGenresComponent);
    component = fixture.componentInstance;
    genresService = TestBed.inject(GenresService);
    spyOn(component, 'loadRecords').and.callThrough();
    spyOn(component, 'updatePagination').and.callThrough();
    spyOn(component, 'deleteGenre').and.callThrough();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should update pagination', () => {
    const pageEvent: any = { pageIndex: 1, pageSize: 10 };
    component.updatePagination(pageEvent);
    // Esperamos que loadRecords se llame solo una vez con los nuevos valores de paginación
    expect(component.loadRecords).toHaveBeenCalledOnceWith(2, 10);
  });
  
  it('should delete genre', () => {
    const genreId = 1;
    spyOn(genresService, 'deleteGenre').and.returnValue(of(null as any));
    component.deleteGenre(genreId);
    // Se espera que deleteGenre se llame solo una vez con el ID correcto
    expect(component.deleteGenre).toHaveBeenCalledOnceWith(genreId);
    // Esperamos que loadRecords se llame una vez con los valores de paginación actuales
    expect(component.loadRecords).toHaveBeenCalledOnceWith(component.actualPage, component.quantityRecordsToShow);
  });
  
  it('should load records on init', () => {
    const genres = [{ id: 1, name: 'Genre 1' }, { id: 2, name: 'Genre 2' }];
    spyOn(genresService, 'getPaginated').and.returnValue(of({
      body: genres,
      headers: {
        get: () => '2'
      }
    }));
    component.ngOnInit(); // Llamar directamente a ngOnInit en lugar de fixture.detectChanges()
    // Esperamos que loadRecords se llame solo una vez durante la inicialización del componente
    expect(component.loadRecords).toHaveBeenCalledOnceWith(1, 10);
    // Esperamos que los registros y la cantidad total de registros se establezcan correctamente
    expect(component.genres).toEqual(genres);
    expect(component.quantityTotalRecords).toEqual(2);
  });
});
