import { Component, OnInit, ViewChild } from '@angular/core';
import { GenresService } from '../../../services/genres/genres.service';
import { genreDTO } from '../../../interfaces/genres/genres';
import { HttpResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {

  genres: genreDTO[] = [];
  columnsToShow = ['id', 'name', 'actions'];
  quantityTotalRecords: number | null = null;
  actualPage = 1;
  quantityRecordsToShow = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private genresService: GenresService) { }

  ngOnInit(): void {
    this.loadRecords(this.actualPage, this.quantityRecordsToShow);
  }

  loadRecords(page: number, quantityRecordsToShow: number) {
    this.genresService.getPaginated(page, quantityRecordsToShow).subscribe((response: HttpResponse<genreDTO[]>) => {
      if (response.body) {
        this.genres = response.body;
      } else {
        this.genres = [];
      }
      this.quantityTotalRecords = parseInt(response.headers.get("quantityTotalRecords") || '0', 10);
    }, error => console.error(error));
  }

  updatePagination(data: PageEvent) {
    this.actualPage = data.pageIndex + 1;
    this.quantityRecordsToShow = data.pageSize;
    this.loadRecords(this.actualPage, this.quantityRecordsToShow);
  }

  deleteGenre(id: number) {
    this.genresService.deleteGenre(id).subscribe(() => {
      this.loadRecords(this.actualPage, this.quantityRecordsToShow);
    }, error => console.error(error));
  }
}
