import { Component, OnInit } from '@angular/core';
import { MovieCreationDTO, MovieDTO } from '../../../interfaces/movies/movie';
import { MoviesService } from '../../../services/movies/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MultipleSelectorModel } from 'src/app/interfaces/selector-multiple/multipleSelectorModel';
import { actorMovieDTO } from '../../../interfaces/actors/actor';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  model!: MovieDTO;
  unselectedGenres!: MultipleSelectorModel[];
  selectedGenres!: MultipleSelectorModel[];
  unselectedCinemas!: MultipleSelectorModel[];
  selectedCinemas!: MultipleSelectorModel[];
  actorsSelected!: actorMovieDTO[];

  constructor(private moviesService: MoviesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.moviesService.putGet(params['id']).subscribe(moviePutGet => {
        this.model = moviePutGet.movie;
        this.unselectedGenres = moviePutGet.unselectedGenres.map(genre => {
          return <MultipleSelectorModel>{key: genre.id,  value: genre.name}
        });
        this.selectedGenres = moviePutGet.selectedGenres.map(genre => {
          return <MultipleSelectorModel>{key: genre.id,  value: genre.name}
        });
        this.unselectedCinemas = moviePutGet.unselectedCinemas.map(cinema => {
          return <MultipleSelectorModel>{key: cinema.id,  value: cinema.name}
        });
        this.selectedCinemas = moviePutGet.selectedCinemas.map(cinema => {
          return <MultipleSelectorModel>{key: cinema.id,  value: cinema.name}
        });
        
        this.actorsSelected = moviePutGet.actors;
      })
    });
  }

  saveChanges(movie: MovieCreationDTO){
    this.moviesService.edit(this.model.id, movie).subscribe(() => {
      this.router.navigate(['/movie/' + this.model.id])
    })
  }

}
