import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Response } from '@angular/http';

import { UserService } from './user/user.service';
import { IsAuthenticatedService } from './Shared/is-authenticated.service';

@Component({
  selector: 'fyp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  subscription: Subscription;

  constructor (private userService: UserService, private isAuthenticatedService: IsAuthenticatedService) {}

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
}
