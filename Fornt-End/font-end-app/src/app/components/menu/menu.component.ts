import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../services/security/security.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public securityService: SecurityService) { }

  ngOnInit(): void {
  }

  logout() {
    this.securityService.logout();
  }
}
