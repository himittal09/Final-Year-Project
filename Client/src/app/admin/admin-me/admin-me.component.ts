import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AdminService } from '../admin.service';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'fyp-admin-me',
  templateUrl: './admin-me.component.html',
  styleUrls: ['./admin-me.component.css']
})
export class AdminMeComponent implements OnInit {

  syncStatus = -1;
  subscription: Subscription;
  constructor(
    private adminService: AdminService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngOnInit() {
    const adminAuthenticated = this.sharedService.isAdminAuthenticated;
    this.subscription = this.adminService.checkAdminAuthenticated().subscribe(() => {
      if (adminAuthenticated) {
        this.syncStatus = 0;
        // all good, both synced
      } else {
        this.syncStatus = 1;
        // synced from server but not from here
      }
    }, (error: any) => {
      if (adminAuthenticated) {
        this.syncStatus = 2;
        // synced from here, but not from server
      } else {
        this.syncStatus = 3;
        // all good, both unsynced
        this.router.navigate(['admin', 'login']);
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  syncWithServer (): void {
    if (this.syncStatus === 1) {
      this.syncStatus = 0;
      this.sharedService.authenticate(0);
    } else if (this.syncStatus === 2) {
      this.syncStatus = 0;
      this.sharedService.authenticate(-1);
    }
  }

}
