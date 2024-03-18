import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieDTO } from '../../../interfaces/movies/movie';
import { MoviesService } from '../../../services/movies/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  constructor(private moviesService: MoviesService) { }

  @Input()
  movies!: MovieDTO[];

  @Output()
  deleted: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

  deleteMovie(movieId: number): void {
    this.moviesService.delete(movieId).subscribe(() => {
      this.deleted.emit();
    });
  }
}
