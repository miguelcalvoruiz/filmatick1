import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cinemaCreationDTO } from '../../../interfaces/cinemas/cinema';
import { Coordinate } from 'src/app/interfaces/map/coordinate';

@Component({
  selector: 'app-form-cinema',
  templateUrl: './form-cinema.component.html',
  styleUrls: ['./form-cinema.component.css']
})
export class FormCinemaComponent implements OnInit, OnChanges {

  form!: FormGroup;

  @Input()
  errors: string[] = [];

  @Input()
  model!: cinemaCreationDTO;

  @Output()
  saveChanges: EventEmitter<cinemaCreationDTO> = new EventEmitter<cinemaCreationDTO>();

  @Output()
  initialCoordinate: EventEmitter<Coordinate[]> = new EventEmitter<Coordinate[]>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['model']) {
      this.initializeForm();
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
  
    if (this.model) {
      const { name, latitude, longitude } = this.model;
      this.form.patchValue({ name, latitude, longitude }); // Aquí se aplica la asignación del modelo al formulario
      const starterCoordinate = [{ latitude, longitude }];
      this.initialCoordinate.emit(starterCoordinate);
    } else {
      this.initialCoordinate.emit([]);
    }
  }  
  
  onSelectedCoordinate(coordinate: Coordinate) {
    if (coordinate && coordinate.latitude !== undefined && coordinate.longitude !== undefined) {
      this.form.patchValue(coordinate);
    }
  }

  onSubmit() {
    this.saveChanges.emit(this.form.value);
  }
}
