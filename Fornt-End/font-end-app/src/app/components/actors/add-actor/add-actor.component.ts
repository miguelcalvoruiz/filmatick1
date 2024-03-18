import { Component, OnInit } from '@angular/core';
import { actorCreationDTO } from '../../../interfaces/actors/actor';
import { ActorsService } from '../../../services/actors/actors.service';
import { Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/shared/helpers';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {

  errors: string[]= [];

  constructor(private actorsService: ActorsService, private router: Router) { }

  ngOnInit(): void {
  }

  saveChanges(actor: actorCreationDTO){
    this.actorsService.addActor(actor).subscribe(() => {
      this.router.navigate(['/actors']);
    }, (error) => this.errors = parseErrorsAPI(error))
  }
}
