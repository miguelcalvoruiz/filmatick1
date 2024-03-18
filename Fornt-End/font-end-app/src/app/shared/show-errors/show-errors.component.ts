import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html',
  styleUrls: ['./show-errors.component.css']
})
export class ShowErrorsComponent implements OnInit {

  @Input()
  errors: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
