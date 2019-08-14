import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

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
    this.subscription = this.userService.getAuthStatus().subscribe((response: HttpResponse<any>) => {
      const authStatus = response.body.authStatus;
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
      this.subscription = this.sharedService.logoutAdmin().subscribe((response: HttpResponse<any>) => {});
    } else {
      this.subscription = this.sharedService.logoutuser().subscribe((response: HttpResponse<any>) => {});
    }
    this.sharedService.resetToDefaults();
    this.subscription.unsubscribe();
  }

}
