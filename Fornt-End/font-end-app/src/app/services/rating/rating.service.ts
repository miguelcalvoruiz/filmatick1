import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private apiURL = environment.apiURL + 'rating';

  constructor(private httpClient: HttpClient) { }

  rate(movieId: number, score: number){
    return this.httpClient.post(this.apiURL, {movieId, score});
  }

  private getApiURL(): string {
    return environment.apiURL + 'rating';
  }
}
