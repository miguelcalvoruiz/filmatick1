import { CinemasService } from '../../../services/cinemas/cinemas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { cinemaDTO } from '../../../interfaces/cinemas/cinema';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-index-cinema',
  templateUrl: './index-cinema.component.html',
  styleUrls: ['./index-cinema.component.css']
})
export class IndexCinemaComponent implements OnInit {

  cinemas: cinemaDTO[] = [];
  columnsToShow = ['id', 'name', 'actions'];
  quantityTotalRecords: number | null = null;
  actualPage = 1;
  quantityRecordsToShow = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cinemasService: CinemasService) { }

  ngOnInit(): void {
    this.loadRecords(this.actualPage, this.quantityRecordsToShow);
  }

  loadRecords(page: number, quantityRecordsToShow: number) {
    this.cinemasService.getAll(page, quantityRecordsToShow).subscribe((response: HttpResponse<cinemaDTO[]>) => {
      if (response.body) {
        this.cinemas = response.body;
      } else {
        this.cinemas = [];
      }
      this.quantityTotalRecords = parseInt(response.headers.get("quantityTotalRecords") || '0', 10);
    }, error => console.error(error));
  }

  updatePagination(data: PageEvent) {
    this.actualPage = data.pageIndex + 1;
    this.quantityRecordsToShow = data.pageSize;
    this.loadRecords(this.actualPage, this.quantityRecordsToShow);
  }

  deleteCinema(id: number) {
    this.cinemasService.deleteCinema(id).subscribe(() => {
      this.loadRecords(this.actualPage, this.quantityRecordsToShow);
    }, error => console.error(error));
  }

}
