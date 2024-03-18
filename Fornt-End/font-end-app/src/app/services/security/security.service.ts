import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authenticationResponse, userCredentials, userDTO } from '../../interfaces/security/security';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private apiURL = environment.apiURL + 'accounts';
  private readonly keyToken = 'token';
  private readonly keyExpiration = 'token-expiration';
  private readonly roleField = 'role';

  constructor(private httpClient: HttpClient) { }

  getUsers(page: number, recordsPerPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.httpClient.get<userDTO[]>(`${this.apiURL}/userslist`, 
    {observe: 'response', params})
  }

  addAdmin(userId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiURL}/addAdmin`, JSON.stringify(userId), {headers});
  }

  deleteAdmin(userId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiURL}/deleteAdmin`, JSON.stringify(userId), {headers});
  }

  isLogged(): boolean {
    const token = localStorage.getItem(this.keyToken);

    if (!token) {
      return false;
    }

    const expiration = localStorage.getItem(this.keyExpiration);

    if (!expiration) {
      return false;
    }

    const expirationDate = new Date(expiration);

    if (expirationDate <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }


  logout() {
    localStorage.removeItem(this.keyToken);
    localStorage.removeItem(this.keyExpiration);
  }

  getRole(): string {
    return this.getFieldJWT(this.roleField)
  }

  getFieldJWT(field: string): string {
    var token = localStorage.getItem(this.keyToken);
    if (!token) {
      return '';
    }
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  register(credentials: userCredentials): Observable<authenticationResponse> {
    return this.httpClient.post<authenticationResponse>(this.apiURL + '/register', credentials)
  }

  saveToken(authenticationResponse: authenticationResponse) {
    localStorage.setItem(this.keyToken, authenticationResponse.token);
    localStorage.setItem(this.keyExpiration, authenticationResponse.expiration.toString());
  }

  login(credentials: userCredentials): Observable<authenticationResponse> {
    return this.httpClient.post<authenticationResponse>(this.apiURL + '/login', credentials)
  }

  getToken() {
    return localStorage.getItem(this.keyToken);
  }

  private getApiURL(): string {
    return environment.apiURL + 'accounts';
  }
}
