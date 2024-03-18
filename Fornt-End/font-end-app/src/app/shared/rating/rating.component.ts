import Swal from 'sweetalert2';
import { SecurityService } from './../../services/security/security.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input()
  maxRating = 5;
  @Input()
  ratingSelected = 0;
  @Output()
  rated: EventEmitter<number> = new EventEmitter<number>();
  ratingLast = 0;
  maxRatingArr: any[] = [];
  voted = false;

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }

  manageMouseEnter(index: number): void {
    this.ratingSelected = index + 1;
  }

  manageMouseLeave() {
    if (this.ratingLast !== 0) {
      this.ratingSelected = this.ratingLast;
    } else {
      this.ratingSelected = 0;
    }
  }

  rate(index: number): void {
    if (this.securityService.isLogged()) {
      this.ratingSelected = index + 1;
      this.voted = true;
      this.ratingLast = this.ratingSelected;
      this.rated.emit(this.ratingSelected);
    } else {
      Swal.fire("Debe Loguearse", "No puede realizar esta accion", "error")
    }
  }
}
