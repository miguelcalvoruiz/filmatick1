import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { actorMovieDTO } from '../../../interfaces/actors/actor';
import { ActorsService } from '../../../services/actors/actors.service';

interface Actor {
  name: string;
  photo: string;
  character: string;
}

@Component({
  selector: 'app-autocomplete-actors',
  templateUrl: './autocomplete-actors.component.html',
  styleUrls: ['./autocomplete-actors.component.css']
})
export class AutocompleteActorsComponent implements OnInit {

  control: FormControl = new FormControl();
  
  @Input()
  actorsSelected: actorMovieDTO[] = [];

  actorsToShow: actorMovieDTO[] = [];

  columnsToShow = ['img', 'name', 'character', 'actions'];

  @ViewChild(MatTable) table!: MatTable<any>

  constructor(private actorsService: ActorsService) {

  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(name => {
      if (typeof name === 'string' && name){
        this.actorsService.getByName(name).subscribe(actors => {
          this.actorsToShow = actors;
        })
      }
    });
  }
  
  optionSelected(event: MatAutocompleteSelectedEvent): void {
      this.actorsSelected.push(event.option.value);
      this.control.patchValue('');
      if (this.table !== undefined){
        this.table.renderRows();
      }
  }

  delete(actor: Actor): void {
    const index = this.actorsSelected.findIndex(a => a.name === actor.name);
    this.actorsSelected.splice(index, 1);
    if (this.table !== undefined){
      this.table.renderRows();
    }
  }

  endDrag(event: CdkDragDrop<any[]>): void {
    const indexPrevious = this.actorsSelected.findIndex(
      actor => actor === event.item.data
    );
    moveItemInArray(this.actorsSelected, indexPrevious, event.currentIndex);
    if (this.table !== undefined){
      this.table.renderRows();
    }
  }
  
}
