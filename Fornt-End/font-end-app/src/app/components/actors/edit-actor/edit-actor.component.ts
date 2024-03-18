import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorCreationDTO, actorDTO } from '../../../interfaces/actors/actor';
import { ActorsService } from '../../../services/actors/actors.service';
import { parseErrorsAPI } from 'src/app/shared/helpers';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {
  model: actorDTO = {} as actorDTO;
  errors: string[] = [];

  constructor(private router: Router, private actorsService: ActorsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.actorsService.getById(params['id']).subscribe(actor => {
        this.model = actor;
      }, () => this.router.navigate(['/actors']))
    });
  }

  saveChanges(actor: actorCreationDTO) {
    this.actorsService.edit(this.model.id, actor).subscribe(() => {
      this.router.navigate(['/actors']);
    }, error => this.errors = parseErrorsAPI(error));
  }

}
