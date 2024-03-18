import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemasService } from '../../../services/cinemas/cinemas.service';
import { cinemaCreationDTO, cinemaDTO } from 'src/app/interfaces/cinemas/cinema';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-edit-cinema',
  templateUrl: './edit-cinema.component.html',
  styleUrls: ['./edit-cinema.component.css']
})
export class EditCinemaComponent implements OnInit {
  model!: cinemaDTO;
  errors: string[] = [];

  constructor(
    private cinemasService: CinemasService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id')); // Ensure id is parsed as a number
    this.cinemasService.getById(id).pipe(
      catchError(error => {
        this.router.navigate(['/cinemas']); // Navigate if there's an error
        return EMPTY;
      })
    ).subscribe(cinema => this.model = cinema);
  }

  saveChanges(cinema: cinemaCreationDTO): void {
    this.cinemasService.edit(this.model.id, cinema).subscribe(
      () => this.router.navigate(['/cinemas']),
      error => this.errors.push(error.error) // Push error to errors array
    );
  }
}
