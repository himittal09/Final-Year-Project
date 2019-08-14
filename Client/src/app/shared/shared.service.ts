import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '@class/user';
import { HttpClient } from '@angular/common/http';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  private userSource = new BehaviorSubject<User | null>(null);
  private userLevelSource = new BehaviorSubject<number>(-1);
  private userAuthenticationSource = new BehaviorSubject<boolean>(false);

  isAuthenticated = this.userAuthenticationSource.asObservable();

  // currentUser = this.userSource.asObservable();

  updateUser (user: User | null) {
    this.userSource.next(user);
  }

  get isUserAuthenticated (): boolean {
    return this.userLevelSource.getValue() === 1;
  }

  get isAdminAuthenticated (): boolean {
    return this.userLevelSource.getValue() === 0;
  }

  authenticate (userLevel: number) {
    this.userLevelSource.next(userLevel);
    this.userAuthenticationSource.next(userLevel >= 0);
  }

  get isAuthenticatedSync () {
    return this.userAuthenticationSource.getValue();
  }

  resetToDefaults () {
    this.userLevelSource.next(-1);
    this.userAuthenticationSource.next(false);
    this.userSource.next(null);
  }

  set initDefaults (userLevel: number) {
    this.userLevelSource.next(userLevel);
    this.userAuthenticationSource.next(userLevel >= 0);
    // this.userSource.next(user);
  }

  logoutuser (): Observable<any> {
    return this.http.delete(`${environment.backendUrl}/user/logout`, { withCredentials: true });
  }

  logoutAdmin (): Observable<any> {
    return this.http.delete(`${environment.backendUrl}/admin/logout`, { withCredentials: true });
  }

}
