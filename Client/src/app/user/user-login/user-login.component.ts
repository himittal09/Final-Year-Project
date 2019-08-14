import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { SharedService } from '@app/shared/shared.service';
import { UserService } from '../user.service';

import * as isEmail from 'validator/lib/isEmail';

import { User } from '@class/index';

@Component({
  selector: 'fyp-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userLoginForm: FormGroup;
  subscription: Subscription;
  isLoginFailure = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.userLoginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        this.emailValidator
      ]),
      'password': new FormControl('', [
        Validators.minLength(8),
        Validators.required,
        Validators.maxLength(64),
        this.containsNoSpaceValidator
      ])
    });
  }

  onSubmit (): void {
    this.subscription = this.userService.loginUser(this.userLoginForm.value).subscribe((response: HttpResponse<User>) => {
      this.sharedService.authenticate(1);
      this.router.navigate(['/exam']);
    }, (error: any) => {
      throw error;
      if ( error.status === 405 ) {
        if (this.sharedService.isUserAuthenticated) {
          return this.router.navigate(['/exam']);
        }
        this.isLoginFailure = 2;
        // some one alreay logged in
        this.sharedService.authenticate(1);
        setTimeout(() => {
          this.router.navigate(['/user']);
        }, 3000);
      } else {
        // 400
        this.isLoginFailure = 1;
      }
    }, () => this.subscription.unsubscribe());
  }

  containsNoSpaceValidator (control: FormControl): {[s: string]: boolean} {
    const controlValue = (<string>control.value);
    if (!controlValue) {
      return null;
    }
    if (controlValue.trim().length > 0) {
      return null;
    }
    return {containsNoSpaceValidator: true};
  }

  emailValidator (control: FormControl): {[s: string]: boolean} {
    return isEmail(control.value) ? null : {emailValidator: true};
  }

}
