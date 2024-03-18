import { RatingService } from './../../../services/rating/rating.service';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies/movies.service';
import { ActivatedRoute } from '@angular/router';
import { MovieDTO } from '../../../interfaces/movies/movie';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoordinateWithMessage } from 'src/app/interfaces/map/coordinate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movies-detail',
  templateUrl: './movies-detail.component.html',
  styleUrls: ['./movies-detail.component.css']
})
export class MoviesDetailComponent implements OnInit {

  movie!: MovieDTO;
  releaseDate!: Date;
  trailerURL!: SafeResourceUrl;
  coordinates: CoordinateWithMessage[] = [];

  constructor(private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private sanitazer: DomSanitizer,
    private ratingService: RatingService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.moviesService.getById(params['id']).subscribe(movie => {
        this.movie = movie;
        this.releaseDate = new Date(this.movie.releaseDate);
        this.trailerURL = this.generateURLYoutubeEmbed(this.movie.trailer);
        this.coordinates = movie.cinemas.map(cinema => {
          return { longitude: cinema.longitude, latitude: cinema.latitude, message: cinema.name }
        });
      })
    })
  }

  rated(score: number) {
    this.ratingService.rate(this.movie.id, score).subscribe(() => {
      Swal.fire("Exitoso", "Su voto ha sido recibido", "success");
    })
  }

  generateURLYoutubeEmbed(url: any): SafeResourceUrl {
    if (!url) {
      return '';
    }

    let video_id = '';
    const splitBySlash = url.split('/');
    const splitByEqual = url.split('=');

    // Verificar si el URL sigue el formato "https://youtu.be/ID"
    if (splitBySlash.length > 1 && splitBySlash[2] === 'youtu.be') {
      video_id = splitBySlash[3];
    }
    // Verificar si el URL sigue el formato "https://www.youtube.com/watch?v=ID"
    else if (splitByEqual.length > 1) {
      video_id = splitByEqual[1];
    }

    if (!video_id) {
      return '';
    }

    // Eliminar cualquier parámetro adicional de la URL
    const positionAmpersand = video_id.indexOf('&');
    if (positionAmpersand !== -1) {
      video_id = video_id.substring(0, positionAmpersand);
    }

    // Construir la URL del video embebido
    const embedUrl = `https://www.youtube.com/embed/${video_id}`;
    return this.sanitazer.bypassSecurityTrustResourceUrl(embedUrl);
  }



}
