import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'fyp-navbar',
  templateUrl: './navbar.component.html',
  styles: [`.navbar {margin-bottom: 0px;}`]
})
export class NavbarComponent implements OnInit {

  subscription: Subscription;
  isAuthenticated = false;

  constructor(
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit () {
    this.sharedService.isAuthenticated.subscribe(value => this.isAuthenticated = value);
  }

  logout () {
    if (this.sharedService.isUserAuthenticated) {
      this.logoutUser();
    } else if (this.sharedService.isAdminAuthenticated) {
      this.logoutAdmin();
    }
  }

  logoutUser () {
    this.subscription = this.sharedService.logoutuser().subscribe((response: HttpResponse<any>) => {
      this.sharedService.authenticate(-1);
      this.router.navigate(['/user/login']);
    }, (error: any) => {
      throw error;
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  logoutAdmin () {
    this.subscription = this.sharedService.logoutAdmin().subscribe((response: HttpResponse<any>) => {
      this.sharedService.authenticate(-1);
      this.router.navigate(['/admin', 'login']);
    }, (error: any) => {
      throw error;
    }, () => {
      this.subscription.unsubscribe();
    });
  }

}
