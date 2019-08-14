import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharedService } from '@app/shared/shared.service';
import { User } from '@class/user';
import { UserService } from '../user.service';

@Component({
  selector: 'fyp-user-me',
  templateUrl: './user-me.component.html',
  styleUrls: ['./user-me.component.css']
})
export class UserMeComponent implements OnInit {

  subscription: Subscription;
  syncStatus = -1;
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    const userauthenticated = this.sharedService.isUserAuthenticated;
    this.subscription = this.userService.getUser().subscribe((response: HttpResponse<User>) => {
      this.user = response.body;
      if (userauthenticated) {
        this.syncStatus = 0;
        // all good
      } else {
        this.syncStatus = 1;
        // synchronised from server, but not synchronised here
      }
    }, (error: any) => {
      if (error.status === 401) {
        if (userauthenticated) {
          this.syncStatus = 2;
          // not synchronised from server, but from here
        } else {
          this.syncStatus = 3;
          this.router.navigate(['user', 'login']);
          // neiter synchronised from server, nor from here
        }
      } else {
        if (userauthenticated) {
          this.syncStatus = 0;
        } else {
          this.syncStatus = 3;
        }
        // 501
        // couldnot get from server, here is truth
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  syncWithServer (): void {
    if (this.syncStatus === 1) {
      this.syncStatus = 0;
      this.sharedService.authenticate(1);
    } else if (this.syncStatus === 2) {
      this.syncStatus = 0;
      this.sharedService.authenticate(-1);
    }
  }

}
