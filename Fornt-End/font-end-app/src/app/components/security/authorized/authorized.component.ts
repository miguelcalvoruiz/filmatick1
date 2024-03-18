import { SecurityService } from '../../../services/security/security.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.css']
})
export class AuthorizedComponent implements OnInit {

  @Input()
  role!: string

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
  }

  isAuthorized(): boolean {
    if (this.role) {
      return this.securityService.getRole() === this.role;
    } else {
      return this.securityService.isLogged();
    }
  }

}
