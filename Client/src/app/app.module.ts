import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UserService } from './user/user.service';
import { AdminService } from './admin/admin.service';
import { ExamService } from './exam/exam.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavbarComponent } from './navbar/navbar.component';

import { ExamInputComponent } from './admin/exam-input/exam-input.component';
import { QuestionInputComponent } from './admin/question-input/question-input.component';
import { AdminComponent } from './admin/admin.component';
import { ViewExamComponent } from './admin/view-exam/view-exam.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminMeComponent } from './admin/admin-me/admin-me.component';
import { DisplayExamComponent } from './admin/view-exam/display-exam.component';

import { UserComponent } from './user/user.component';
import { UserSignupComponent } from './user/user-signup/user-signup.component';

import { RouteNotFoundComponent } from './route-not-found/route-not-found.component';
import { ExamComponent } from './exam/exam.component';
import { UserLoginComponent } from './user/user-login/user-login.component';

import { IsAuthenticatedService } from './Shared/is-authenticated.service';
import { UserMeComponent } from './user/user-me/user-me.component';

import { ExamAttempComponent } from './exam/exam-attemp/exam-attemp.component';
import { ExamQuickResultComponent } from './exam/exam-quick-result/exam-quick-result.component';
import { ExamResultComponent } from './exam/exam-result/exam-result.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';

import { CanDeactivateComponent } from './Guards/can-leave-exam.guard';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

import { CanActivateAdminComponentGuard } from './Guards/can-activate-admin-component.guard';
import { CanActivateUnprotectedComponentGuard } from './Guards/can-activate-unprotected-component.guard';
import { CanActivateUserComponentGuard } from './Guards/can-activate-user-component.guard';

declare let require: any;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RouteNotFoundComponent,
    UserSignupComponent,
    ExamInputComponent,
    QuestionInputComponent,
    ExamComponent,
    UserComponent,
    AdminComponent,
    ViewExamComponent,
    UserLoginComponent,
    AdminLoginComponent,
    UserMeComponent,
    AdminMeComponent,
    DisplayExamComponent,
    ExamAttempComponent,
    ExamQuickResultComponent,
    ExamResultComponent,
    ExamListComponent,
    AboutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [
    UserService,
    AdminService,
    IsAuthenticatedService,
    ExamService,
    CanDeactivateComponent,
    CanActivateAdminComponentGuard,
    CanActivateUnprotectedComponentGuard,
    CanActivateUserComponentGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
