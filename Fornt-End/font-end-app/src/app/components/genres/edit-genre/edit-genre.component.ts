import { GenresService } from '../../../services/genres/genres.service';
import { genreDTO, genresCreationDTO } from '../../../interfaces/genres/genres';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/shared/helpers';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {

  model: genreDTO = {} as genreDTO;
  errors: string[] = [];

  constructor(private router: Router, private genresService: GenresService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.genresService.getById(params['id']).subscribe(genre => {
        this.model = genre;
      }, () => this.router.navigate(['/genres']))
    });
  }

  saveChanges(genre: genresCreationDTO) {
    this.genresService.edit(this.model.id, genre).subscribe(() => {
      this.router.navigate(['/genres']);
    }, (error) => this.errors = parseErrorsAPI(error))
  }
}
