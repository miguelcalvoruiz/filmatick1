import { SecurityService } from './../../../services/security/security.service';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { userDTO } from 'src/app/interfaces/security/security';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.css']
})
export class UsersIndexComponent implements OnInit {

  users: userDTO[] = [];
  columnsToShow = ['id', 'email', 'actions'];
  quantityTotalRecords: number | null = null;
  actualPage = 1;
  quantityRecordsToShow = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.loadRecords(this.actualPage, this.quantityRecordsToShow);
  }

  loadRecords(page: number, quantityRecordsToShow: number) {
    this.securityService.getUsers(page, quantityRecordsToShow).subscribe((response: HttpResponse<userDTO[]>) => {
      if (response.body) {
        this.users = response.body;
      } else {
        this.users = [];
      }
      this.quantityTotalRecords = parseInt(response.headers.get("quantityTotalRecords") || '0', 10);
    }, error => console.error(error));
  }

  updatePagination(data: PageEvent) {
    this.actualPage = data.pageIndex + 1;
    this.quantityRecordsToShow = data.pageSize;
    this.loadRecords(this.actualPage, this.quantityRecordsToShow);
  }

  addAdmin(userId: string) {
    this.securityService.addAdmin(userId)
      .subscribe(() => Swal.fire('Exitoso', 'La operación se ha realizado', 'success'));
  }

  deleteAdmin(userId: string) {
    this.securityService.deleteAdmin(userId)
      .subscribe(() => Swal.fire('Exitoso', 'La operación se ha realizado', 'success'));
  }

}
