import { SecurityService } from '../../../services/security/security.service';
import { Component, OnInit } from '@angular/core';
import { userCredentials } from '../../../interfaces/security/security';
import { Router } from '@angular/router';
import { parseErrorsAPI } from 'src/app/shared/helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errors: string[] = [];

  constructor(private securityService: SecurityService, private router: Router) { }

  ngOnInit(): void {
  }

  login(credentials: userCredentials){
    this.securityService.login(credentials).subscribe(response => {
      this.securityService.saveToken(response);
      this.router.navigate(['/']);
    }, error => {
      this.errors = parseErrorsAPI(error);
    });
  }
  

}
