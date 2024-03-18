import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { genresCreationDTO } from '../../../interfaces/genres/genres';
import { GenresService } from '../../../services/genres/genres.service';
import { parseErrorsAPI } from 'src/app/shared/helpers';

@Component({
  selector: 'app-add-genres',
  templateUrl: './add-genres.component.html',
  styleUrls: ['./add-genres.component.css']
})
export class AddGenresComponent {

  errors: string[]= [];

  constructor(private router: Router, private genresService: GenresService) {
  }

  saveChanges(genre: genresCreationDTO) {
    this.errors = [];
    this.genresService.add(genre).subscribe(
      () => {
        this.router.navigate(['/genres']);
      },
      (error) => {
        if (error && error.error && error.error.errors) {
          this.errors = parseErrorsAPI(error);
        } else {
          this.errors = ['Error saving genre'];
        }
      }
    );
  }
}
