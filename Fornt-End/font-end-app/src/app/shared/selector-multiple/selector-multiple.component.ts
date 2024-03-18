import { Component, Input, OnInit } from '@angular/core';
import { MultipleSelectorModel } from '../../interfaces/selector-multiple/multipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  @Input()
  selected: MultipleSelectorModel[] = [];

  @Input()
  unselected: MultipleSelectorModel[] = []; 

  constructor() { }

  ngOnInit(): void {
  }

  selectAll(){
    this.selected.push(...this.unselected);
    this.unselected = [];
  }

  unselectAll(){
    this.unselected.push(...this.selected);
    this.selected = [];
  }

  select(genre: MultipleSelectorModel, index: number){
    this.selected.push(genre);
    this.unselected.splice(index, 1);
  }

  unselect(genre: MultipleSelectorModel, index: number){
    this.unselected.push(genre);
    this.selected.splice(index, 1);
  }

}
