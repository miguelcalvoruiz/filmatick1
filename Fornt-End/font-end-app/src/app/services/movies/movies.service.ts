import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LandingPageDTO, MovieCreationDTO, MovieDTO, MoviePostGet, MoviePutGet } from '../../interfaces/movies/movie';
import { formatDate } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiURL = environment.apiURL + 'movies'

  constructor(private http: HttpClient) {

  }

  public getLandingPage(): Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(this.apiURL);
  }

  public getById(id: number): Observable<MovieDTO>{
    return this.http.get<MovieDTO>(`${this.apiURL}/${id}`);
  }

  public postGet(): Observable<MoviePostGet> {
    return this.http.get<MoviePostGet>(`${this.apiURL}/postget`);
  }

  public putGet(id: number): Observable<MoviePutGet> {
    return this.http.get<MoviePutGet>(`${this.apiURL}/putget/${id}`);
  }

  public filter(values: any): Observable<any> {
    return this.http.get<MovieDTO[]>(`${this.apiURL}/filter`, { params: values, observe: 'response' }).pipe(
      catchError(() => of({ body: [], headers: new Map() }))
    );
  }

  public add(movie: MovieCreationDTO): Observable<number>{
    const formData = this.BuildFormData(movie);
    return this.http.post<number>(this.apiURL, formData);
  }

  public edit(id: number, movie: MovieCreationDTO){
    const formData = this.BuildFormData(movie);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  public delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`)
  }

  private BuildFormData(movie: MovieCreationDTO): FormData {
    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    formData.append('onCinemas', String(movie.onCinemas));
    if (movie.releaseDate) {
      formData.append('releaseDate', formatDate(movie.releaseDate));
    }
    if (movie.poster) {
      formData.append('poster', movie.poster);
    }
    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('cinemasIds', JSON.stringify(movie.cinemasIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;
  }

  private getApiURL(): string {
    return environment.apiURL + 'movies';
  }
}
