import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AdminService } from '../admin/admin.service';
import { IsAuthenticatedService } from '../Shared/is-authenticated.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'fyp-navbar',
  templateUrl: './navbar.component.html',
  styles: [`.navbar {margin-bottom: 0px;}`]
})
export class NavbarComponent {

  subscription: Subscription;

  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private router: Router,
    private isAuthenticatedService: IsAuthenticatedService
  ) { }

  logout () {
    if (this.isAuthenticatedService.isUserAuthenticated()) {
      this.subscription = this.userService.logoutuser().subscribe((response: Response) => {
        this.isAuthenticatedService.unAuthenticate();
        this.router.navigate(['/user/login']);
      }, (error: any) => {
        console.error('Logging Out Procedure Failed');
      }, () => {
        this.subscription.unsubscribe();
      });
    } else if (this.isAuthenticatedService.isAdminAuthenticated()) {
      this.subscription = this.adminService.logoutAdmin().subscribe((response: Response) => {
        this.isAuthenticatedService.unAuthenticate();
        this.router.navigate(['/admin', 'login']);
      }, (error: any) => {
        console.error('Logging Out Procedure Failed');
      }, () => {
        this.subscription.unsubscribe();
      });
    }
  }

  ifAuthenticated () {
    return this.isAuthenticatedService.ifAuthenticated();
  }

}
