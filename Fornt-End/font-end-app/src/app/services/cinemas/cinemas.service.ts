import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { cinemaCreationDTO, cinemaDTO } from '../../interfaces/cinemas/cinema';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemasService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiURL + 'cinemas';

  public add(cinema: cinemaCreationDTO) {
    return this.http.post(this.apiUrl, cinema);
  }

  public getAll(page: number, recordsPerPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('recordsPerPage', recordsPerPage.toString());

    return this.http.get<cinemaDTO[]>(this.apiUrl, { params, observe: 'response' });
  }

  public getById(id: number): Observable<cinemaDTO> {
    return this.http.get<cinemaDTO>(`${this.apiUrl}/${id}`);
  }

  public edit(id: number, cinema: cinemaCreationDTO) {
    return this.http.put<cinemaDTO>(`${this.apiUrl}/${id}`, cinema);
  }

  public deleteCinema(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private getApiURL(): string {
    return environment.apiURL;
  }
}
