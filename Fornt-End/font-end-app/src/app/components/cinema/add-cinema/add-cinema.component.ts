import { Component, OnInit } from '@angular/core';
import { cinemaCreationDTO } from '../../../interfaces/cinemas/cinema';
import { Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/shared/helpers';
import { CinemasService } from '../../../services/cinemas/cinemas.service';

@Component({
  selector: 'app-add-cinema',
  templateUrl: './add-cinema.component.html',
  styleUrls: ['./add-cinema.component.css']
})
export class AddCinemaComponent {
  errors: string[]= [];

  constructor(private router: Router, private cinemasService: CinemasService) {
  }

  saveChanges(cinema: cinemaCreationDTO) {
    this.cinemasService.add(cinema).subscribe(() => {
      this.router.navigate(['/cinemas']);
    }, (error) => this.errors = parseErrorsAPI(error));    
  }
}
