import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userCredentials } from '../../../interfaces/security/security';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})
export class AuthenticationFormComponent implements OnInit {
  form!: FormGroup;

  @Input()
  errors: string[] = [];

  @Input()
  action!: string;

  @Output()
  onSubmit: EventEmitter<userCredentials> = new EventEmitter<userCredentials>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email]
        }
      ],
      password: [
        '',
        {
          validators: [Validators.required]
        }
      ]
    });
  }

  getErrorMessageEmail() {
    var field = this.form.get('email');
    if (field?.hasError('required')) {
      return 'El campo Email es requerido'
    }
    if (field?.hasError('email')) {
      return 'El Email no es valido'
    }
    return '';
  }
}
