import { SecurityService } from '../../../services/security/security.service';
import { Component, OnInit } from '@angular/core';
import { userCredentials } from '../../../interfaces/security/security';
import { parseErrorsAPI } from 'src/app/shared/helpers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors: string[] = [];

  constructor(private securityService: SecurityService, private router: Router) { }

  ngOnInit(): void {
  }

  register(credentials: userCredentials){
    this.securityService.register(credentials).subscribe(response => {
      this.securityService.saveToken(response);
      this.router.navigate(['/']);
    }, errors => this.errors = parseErrorsAPI(errors))
  }

}
