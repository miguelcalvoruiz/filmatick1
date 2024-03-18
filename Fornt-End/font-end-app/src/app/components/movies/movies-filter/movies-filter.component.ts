import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { genreDTO } from '../../../interfaces/genres/genres';
import { MovieDTO } from '../../../interfaces/movies/movie';
import { PageEvent } from '@angular/material/paginator';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MoviesService } from '../../../services/movies/movies.service';
import { GenresService } from '../../../services/genres/genres.service';

@Component({
  selector: 'app-movies-filter',
  templateUrl: './movies-filter.component.html',
  styleUrls: ['./movies-filter.component.css']
})
export class MoviesFilterComponent implements OnInit {

  form: FormGroup;
  genres: genreDTO[] = [];
  movies: MovieDTO[] = [];
  actualPage = 1;
  quantityElementsToShow = 10;
  quantityElements!: number;

  formOriginal = {
    title: '',
    genreId: 0,
    nextReleases: false,
    onCinemas: false
  };

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private genresService: GenresService,
    private moviesService: MoviesService
  ) {
    this.form = this.formBuilder.group(this.formOriginal);
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.genresService.getAll().pipe(
      catchError(() => EMPTY)
    ).subscribe(genres => {
      this.genres = genres;
      this.readValuesURL();
      this.searchMovies(this.form.value);

      this.form.valueChanges.subscribe(data => {
        this.searchMovies(data);
        this.writeSearchParametersInURL();
      });
    });
  }

  reloadData() {
    this.searchMovies(this.form.value);
  }

  private readValuesURL() {
    this.activatedRoute.queryParams.subscribe((params) => {
      var objt: any = {};
      if (params['title']) {
        objt.title = params['title'];
      }

      if (params['genreId']) {
        objt.genreId = Number(params['genreId']);
      }

      if (params['nextReleases']) {
        objt.nextReleases = params['nextReleases'];
      }

      if (params['onCinemas']) {
        objt.onCinemas = params['onCinemas'];
      }

      this.form.patchValue(objt);
    });
  }


  private writeSearchParametersInURL() {
    var queryStrings = [];

    var formValues = this.form.value;

    if (formValues.title) {
      queryStrings.push(`title=${formValues.title}`);
    }

    if (formValues.genreId !== 0) {
      queryStrings.push(`genreId=${formValues.genreId}`);
    }

    if (formValues.nextReleases) {
      queryStrings.push(`nextReleases=${formValues.nextReleases}`);
    }

    if (formValues.onCinemas) {
      queryStrings.push(`onCinemas=${formValues.onCinemas}`);
    }

    this.location.replaceState('movies/search', queryStrings.join('&'));
  }

  searchMovies(data: any) {
    data.page = this.actualPage;
    data.recordsPerPage = this.quantityElementsToShow;
    this.moviesService.filter(data).subscribe(response => {
      this.movies = response.body;
      if (response.headers) {
        this.quantityElements = Number(response.headers.get('quantityElementsToShow'));
      }
    });
  }

  clearForm() {
    this.form.patchValue(this.formOriginal);
  }

  updatePagination(data: PageEvent) {
    this.actualPage = data.pageIndex + 1;
    this.quantityElementsToShow = data.pageSize;
    this.searchMovies(this.form.value);
  }

}
