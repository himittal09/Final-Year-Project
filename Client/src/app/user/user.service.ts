import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { env_config } from '../../environments/env';

import { User } from '../Classes';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  checkEmailUnique (email: string): Observable<Response> {
    return this.http.post(env_config.api_path + 'user/email', {email}, { withCredentials: true });
  }

  registerUser (user: User): Observable<Response> {
    return this.http.post(env_config.api_path + 'user/signup', user, { withCredentials: true });
  }

  loginUser (body: any): Observable<Response> {
    return this.http.post(env_config.api_path + 'user/login', body, { withCredentials: true });
  }

  logoutuser (): Observable<Response> {
    return this.http.delete(env_config.api_path + 'user/logout', { withCredentials: true });
  }

  getUser (): Observable<Response> {
    return this.http.get(env_config.api_path + 'user/me', { withCredentials: true });
  }

  getAuthStatus (): Observable<Response> {
    return this.http.get(env_config.api_path + 'authstatus', { withCredentials: true });
  }

}
