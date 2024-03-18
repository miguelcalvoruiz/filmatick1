// index-actor.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActorsService } from '../../../services/actors/actors.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { actorDTO } from '../../../interfaces/actors/actor';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-index-actor',
  templateUrl: './index-actor.component.html',
  styleUrls: ['./index-actor.component.css']
})
export class IndexActorComponent implements OnInit {

  actors: actorDTO[] = [];
  columnsToShow = ['id', 'name', 'actions'];
  quantityTotalRecords: number | null = null;
  actualPage = 1;
  quantityRecordsToShow = 10;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private actorsService: ActorsService) { }

  ngOnInit(): void {
    this.loadRecords(this.actualPage, this.quantityRecordsToShow);
  }

  loadRecords(page: number, quantityRecordsToShow: number) {
    this.actorsService.getAll(page, quantityRecordsToShow).subscribe((response: HttpResponse<actorDTO[]>) => {
      if (response.body) {
        this.actors = response.body;
      } else {
        this.actors = [];
      }
      this.quantityTotalRecords = parseInt(response.headers.get("quantityTotalRecords") || '0', 10);
    }, error => console.error(error));
  }

  updatePagination(data: PageEvent) {
    this.actualPage = data.pageIndex + 1;
    this.quantityRecordsToShow = data.pageSize;
    if (this.actorsService) {
        this.loadRecords(this.actualPage, this.quantityRecordsToShow);
    }
  }

  deleteActor(id: number) {
    this.actorsService.deleteActor(id).subscribe(() => {
      this.loadRecords(this.actualPage, this.quantityRecordsToShow);
    }, error => console.error(error));
  }

}
