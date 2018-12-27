import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModule } from './user.module';

import { User } from '@class/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  checkEmailUnique (email: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/email', {email}, { withCredentials: true });
  }

  registerUser (user: User): Observable<any> {
    return this.http.post('http://localhost:3000/user/signup', user, { withCredentials: true });
  }

  loginUser (body: any): Observable<any> {
    return this.http.post('http://localhost:3000/user/login', body, { withCredentials: true });
  }

  getUser (): Observable<any> {
    return this.http.get('http://localhost:3000/user/me', { withCredentials: true });
  }

  getAuthStatus (): Observable<any> {
    return this.http.get('http://localhost:3000/authstatus', { withCredentials: true });
  }

}
