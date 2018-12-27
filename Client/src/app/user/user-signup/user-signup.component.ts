import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { debounceTime, map } from 'rxjs/operators';

import { SharedService } from '@app/shared/shared.service';
import { UserService } from '../user.service';

import validator from 'validator';

@Component({
  selector: 'fyp-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  loginForm: FormGroup;
  subscription: Subscription;
  isRegistrationFailure = -1;

  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'firstName': new FormControl('', [
        Validators.maxLength(15),
        Validators.required,
        this.containsNoSpaceValidator
      ]),
      'middleName': new FormControl('', [
        Validators.maxLength(15),
        this.containsNoSpaceValidator
      ]),
      'lastName': new FormControl('', [
        Validators.maxLength(15),
        Validators.required,
        this.containsNoSpaceValidator
      ]),
      'phoneNumber': new FormControl('', [
        Validators.required,
        Validators.maxLength(14),
        this.phoneNumberValidator
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ], [
        this.emailUniqueValidator.bind(this)
      ]),
      'address': new FormControl('', [
        Validators.maxLength(500),
        this.containsNoSpaceValidator
      ]),
      'studentClass': new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        this.containsNoSpaceValidator
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        this.containsNoSpaceValidator
      ]),
      'confirm': new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        this.containsNoSpaceValidator
      ])
    }, this.matchingPasswords('password', 'confirm'));
  }

  onSubmit(): void {
    this.subscription = this.userService.registerUser(this.loginForm.value).subscribe((response: Response) => {
      this.isRegistrationFailure = 0;
      this.loginForm.reset({'phoneNumber': ''});
      this.sharedService.authenticate(1);
      setTimeout(() => {
        this.router.navigate(['/exam']);
      }, 3000);
    }, (error: any) => {
      if (error.status === 405) {
        if (this.sharedService.isUserAuthenticated) {
          this.isRegistrationFailure = 0;
          return this.router.navigate(['/exam']);
        }
        this.sharedService.authenticate(1);
        this.isRegistrationFailure = 2;
        // already logged in
        setTimeout(() => {
          this.router.navigate(['/exam']);
        }, 3000);
      } else {
        this.isRegistrationFailure = 1; // 503
      }
      throw error;
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  phoneNumberValidator (control: FormControl): {[s: string]: boolean} {
    return validator.isMobilePhone((<string>control.value), 'en-IN') ? null : {phoneNumberValidator: true};
  }

  emailUniqueValidator (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> {

    return this.userService.checkEmailUnique(control.value).pipe(
      debounceTime(500),
      map(value => value.found ? {emailUniqueValidator: true} : null)
    );

    // return new Promise((resolve, reject) => {
    //   this.userService.checkEmailUnique(control.value).subscribe((response: Response) => {
    //     response.json().found ? resolve({emailUniqueValidator: true}) : resolve(null);
    //   }, (error: any) => resolve({emailUniqueValidator: true}));
    // });
  }

  matchingPasswords (password: string, confirm: string): any {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return { 'matchingPasswords': true };
      }
    };
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

}
