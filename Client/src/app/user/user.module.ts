import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { UserLoginComponent } from './user-login/user-login.component';
import { UserMeComponent } from './user-me/user-me.component';
import { UserSignupComponent } from './user-signup/user-signup.component';

import { USER_ROUTES } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    UserLoginComponent,
    UserMeComponent,
    UserSignupComponent
  ],
  exports: [
    UserLoginComponent,
    UserMeComponent,
    UserSignupComponent
  ]
})
export class UserModule { }
