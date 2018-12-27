import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Response } from '@angular/http';

import { UserService } from './user/user.service';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'fyp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor (
    private userService: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit () {
    this.subscription = this.userService.getAuthStatus().subscribe((response: Response) => {
      const authStatus = response.json().authStatus;
      if (authStatus === 2) {
        this.sharedService.authenticate(-1);
      } else if (authStatus === 0) {
        this.sharedService.authenticate(1);
      } else {
        this.sharedService.authenticate(0);
      }
    }, (error: any) => {
      this.sharedService.authenticate(-1);
      throw error;
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  ngOnDestroy () {
    if (!this.sharedService.isAuthenticatedSync) {
      return this.sharedService.resetToDefaults();
    }
    if (this.sharedService.isAdminAuthenticated) {
      this.subscription = this.sharedService.logoutAdmin().subscribe((response: Response) => {});
    } else {
      this.subscription = this.sharedService.logoutuser().subscribe((response: Response) => {});
    }
    this.sharedService.resetToDefaults();
    this.subscription.unsubscribe();
  }

}
