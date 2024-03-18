import { genresCreationDTO } from '../../../interfaces/genres/genres';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstCapitalLetter } from 'src/app/shared/validators/firstCapitalLetter';

@Component({
  selector: 'app-form-genre',
  templateUrl: './form-genre.component.html',
  styleUrls: ['./form-genre.component.css']
})
export class FormGenreComponent implements OnInit {

  @Input()
  model: genresCreationDTO;

  @Input()
  errors: string[] = [];

  @Output()
  onSubmit: EventEmitter<genresCreationDTO> = new EventEmitter<genresCreationDTO>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.model = { name: '' };
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required, Validators.minLength(3), firstCapitalLetter()]
      }]
    });

    // Inicializa el formulario con el modelo proporcionado
    if (this.model) {
      this.form.patchValue(this.model);
    }
  }

  saveChanges() {
    this.onSubmit.emit(this.form.value);
  }

  ngOnInit(): void {
  }

  getErrorNameLabel() {
    const nameControl = this.form.get('name');

    if (nameControl?.hasError('required')) {
      return 'El campo nombre es requerido';
    }

    if (nameControl?.hasError('minlength')) {
      return 'La longitud mínima es de 3 caracteres';
    }

    if (nameControl?.hasError('firstCapitalLetter')) {
      return 'El nombre debe comenzar con mayúscula';
    }

    return '';
  }
}
