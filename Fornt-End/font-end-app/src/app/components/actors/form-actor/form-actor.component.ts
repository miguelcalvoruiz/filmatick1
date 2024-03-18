import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { actorCreationDTO, actorDTO } from '../../../interfaces/actors/actor';

@Component({
  selector: 'app-form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.component.css']
})
export class FormActorComponent implements OnInit {
  form!: FormGroup;
  imgChange = false;

  @Input()
  model!: actorDTO;

  @Input()
  errors: string[] = [];

  @Output()
  onSubmit: EventEmitter<actorCreationDTO> = new EventEmitter<actorCreationDTO>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', { validators: [Validators.required] }],
      birthdate: [null, { validators: [Validators.required] }],
      photo: '',
      biography: ''
    });

    if (this.model !== undefined) {
      if ('biography' in this.model) {
        this.form.patchValue({
          name: this.model.name || '',
          birthdate: this.model.birthdate ? new Date(this.model.birthdate) : '',
          photo: this.model.photo || '',
          biography: this.model.biography !== null ? this.model.biography : ''
        });
      }
    }
  }

  saveChanges() {
    if (this.model && !this.imgChange) {
      this.form.patchValue({ 'photo': this.model.photo });
    }
    this.onSubmit.emit(this.form.value);
  }

  fileSelected(file: File) {
    this.imgChange = true;
    this.form.get('photo')?.setValue(file);
  }

  saveMarkdown(text: string) {
    this.form.get('biography')?.setValue(text);
  }

}
