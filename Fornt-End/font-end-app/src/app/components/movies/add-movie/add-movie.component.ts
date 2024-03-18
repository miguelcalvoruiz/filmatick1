import { Component, OnInit } from '@angular/core';
import { MovieCreationDTO } from '../../../interfaces/movies/movie';
import { MoviesService } from '../../../services/movies/movies.service';
import { MultipleSelectorModel } from 'src/app/interfaces/selector-multiple/multipleSelectorModel';
import { parseErrorsAPI } from 'src/app/shared/helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  genresNotSelected: MultipleSelectorModel[] = [];
  cinemasNotSelected: MultipleSelectorModel[] = [];

  errors: string[] = [];

  constructor(private moviesService: MoviesService, private router: Router) { }

  ngOnInit(): void {
    this.moviesService.postGet().subscribe(result => {
      this.genresNotSelected = result.genres.map(genre => {
        return <MultipleSelectorModel>{ key: genre.id, value: genre.name }
      });
      this.cinemasNotSelected = result.cinemas.map(cinema => {
        return <MultipleSelectorModel>{ key: cinema.id, value: cinema.name }
      });
    }, error => console.error(error));
  }

  saveChanges(movie: MovieCreationDTO) {
    this.moviesService.add(movie).subscribe((id: number) => 
      this.router.navigate(['/movie/' + id]), 
      error => this.errors = parseErrorsAPI(error));
  }

}
