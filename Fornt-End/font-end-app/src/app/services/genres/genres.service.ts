import { Injectable } from '@angular/core';
import { genreDTO, genresCreationDTO } from '../../interfaces/genres/genres';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiURL + 'genres';

  public getPaginated(page: number, recordsPerPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('recordsPerPage', recordsPerPage.toString());
    return this.http.get<genreDTO[]>(this.apiUrl, { params, observe: 'response' });
  }

  public getAll(): Observable<genreDTO[]> {
    return this.http.get<genreDTO[]>(`${this.apiUrl}/all`).pipe(
      catchError(() => of([]))
    );
  }

  public getById(id: number): Observable<genreDTO> {
    return this.http.get<genreDTO>(`${this.apiUrl}/${id}`);
  }

  public add(genre: genresCreationDTO) {
    return this.http.post(this.apiUrl, genre);
  }

  public edit(id: number, genre: genresCreationDTO) {
    return this.http.put<genreDTO>(`${this.apiUrl}/${id}`, genre);
  }

  public deleteGenre(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private getApiURL(): string {
    return environment.apiURL + 'genres';
  }
}
