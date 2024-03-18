import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';

import { MoviesFilterComponent } from './movies-filter.component';
import { GenresService } from '../../../services/genres/genres.service';
import { MoviesService } from '../../../services/movies/movies.service';

describe('MoviesFilterComponent', () => {
  let component: MoviesFilterComponent;
  let fixture: ComponentFixture<MoviesFilterComponent>;
  let genresService: GenresService;
  let moviesService: MoviesService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesFilterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: GenresService,
          useValue: {
            getAll: () => of([{ id: 1, name: 'Action' }, { id: 2, name: 'Comedy' }])
          }
        },
        {
          provide: MoviesService,
          useValue: {
            filter: () => new BehaviorSubject([])
          }
        },
        Location,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({})
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesFilterComponent);
    component = fixture.componentInstance;
    genresService = TestBed.inject(GenresService);
    moviesService = TestBed.inject(MoviesService);
    formBuilder = TestBed.inject(FormBuilder);

    spyOn(component, 'searchMovies').and.callThrough();

    component.form = formBuilder.group({
      title: [''],
      genreId: [null],
      nextReleases: [false],
      onCinemas: [false]
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load genres on init', () => {
    expect(component.genres.length).toBeGreaterThan(0);
  });

  it('should search movies when form value changes', () => {
    // Simulate form value changes
    component.form.patchValue({
      title: 'Test',
      genreId: 1,
      nextReleases: true,
      onCinemas: false
    });

    // Expect searchMovies to be called with the patched form value
    expect(component.searchMovies).toHaveBeenCalledWith({
      title: 'Test',
      genreId: 1,
      nextReleases: true,
      onCinemas: false,
      page: 1, // Include page and recordsPerPage in the expected object
      recordsPerPage: 10
    });
  });
});
