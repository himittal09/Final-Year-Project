import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { UserModule } from './user.module';
import { environment } from '../../environments/environment';
import { User } from '@class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  checkEmailUnique (email: string): Observable<HttpResponse<{[key: string]: number}>> {
    return this.http.post<{[key: string]: number}>(environment.backendUrl + '/user/email', {email}, { withCredentials: true, observe: 'response' });
  }

  registerUser (user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(environment.backendUrl + '/user/signup', user, { withCredentials: true, observe: 'response' });
  }

  loginUser (body: any): Observable<HttpResponse<User>> {
    return this.http.post<User>(environment.backendUrl + '/user/login', body, { withCredentials: true, observe: 'response' });
  }

  getUser (): Observable<HttpResponse<User>> {
    return this.http.get<User>(environment.backendUrl + '/user/me', { withCredentials: true, observe: 'response' });
  }

  getAuthStatus (): Observable<HttpResponse<{[key: string]: number}>> {
    return this.http.get<{[key: string]: number}>(environment.backendUrl + '/authstatus', { withCredentials: true, observe: 'response' });
  }

}
