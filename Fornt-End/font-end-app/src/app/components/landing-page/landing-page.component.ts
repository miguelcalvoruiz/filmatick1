import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies/movies.service';
import { MovieDTO } from '../../interfaces/movies/movie';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  moviesOnCinemas: MovieDTO[] = [];

  moviesUpcoming: MovieDTO[] = [];

  constructor(private moviesService: MoviesService){
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.moviesService.getLandingPage().subscribe(landingPage => {
      this.moviesOnCinemas = landingPage.onCinemas;
      this.moviesUpcoming = landingPage.nextReleases;
    });
  }

  deleted(){
    this.loadData();
  }
}
