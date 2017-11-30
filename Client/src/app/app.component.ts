import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { UserService } from './user/user.service';
import { IsAuthenticatedService } from './Shared/is-authenticated.service';
import { AdminService } from './admin/admin.service';

@Component({
  selector: 'fyp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor (
    private userService: UserService,
    private isAuthenticatedService: IsAuthenticatedService,
    private adminService: AdminService
  ) {}

  ngOnInit () {
    this.subscription = this.userService.getAuthStatus().subscribe((response: Response) => {
      const authStatus = response.json().authStatus;
      if (authStatus === 2) {
        this.isAuthenticatedService.unAuthenticate();
      } else if (authStatus === 0) {
        this.isAuthenticatedService.authenticateAdmin();
      } else {
        this.isAuthenticatedService.authenticateUser();
      }
    }, (error: any) => {
      console.error(error);
      this.isAuthenticatedService.unAuthenticate();
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  ngOnDestroy () {
    if (!this.isAuthenticatedService.ifAuthenticated()) {
      return this.isAuthenticatedService.clearStorage();
    }
    if (this.isAuthenticatedService.isAdminAuthenticated()) {
      this.subscription = this.adminService.logoutAdmin().subscribe((response: Response) => {}, (error: any) => {}, () => this.subscription.unsubscribe());
    } else {
      this.subscription = this.userService.logoutuser().subscribe((response: Response) => {}, (error: any) => {}, () => this.subscription.unsubscribe());
    }
    this.isAuthenticatedService.clearStorage();
  }

}
