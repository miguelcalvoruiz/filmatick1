import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { actorCreationDTO, actorDTO, actorMovieDTO } from '../../interfaces/actors/actor';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { formatDate } from 'src/app/shared/helpers';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private apiUrl = environment.apiURL + 'actors';

  constructor(private http: HttpClient) { }

  private getApiUrl(): string {
    return this.apiUrl;
  }

  public addActor(actor: actorCreationDTO) {
    const formData = this.buildFormData(actor);
    return this.http.post(this.apiUrl, formData);
  }

  public getAll(page: number, recordsPerPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('recordsPerPage', recordsPerPage.toString());

    return this.http.get<actorDTO[]>(this.apiUrl, { params, observe: 'response' });
  }

  public getById(id: number): Observable<actorDTO> {
    return this.http.get<actorDTO>(`${this.apiUrl}/${id}`).pipe();
  }

  public getByName(name: string): Observable<actorMovieDTO[]> {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<actorMovieDTO[]>(`${this.apiUrl}/searchByName`, JSON.stringify(name), {headers});
  }

  public edit(id: number, actor: actorCreationDTO) {
    const formData = this.buildFormData(actor);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  public deleteActor(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private buildFormData(actor: actorCreationDTO): FormData {
    const formData = new FormData();
    formData.append('name', actor.name);
    if (actor.biography) {
      formData.append('biography', actor.biography);
    }
    if (actor.birthdate) {
      formData.append('birthdate', formatDate(actor.birthdate));
    }
    if (actor.photo) {
      formData.append('photo', actor.photo);
    }
    return formData;
  }
}
