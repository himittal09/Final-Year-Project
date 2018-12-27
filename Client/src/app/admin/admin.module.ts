import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ExamInputComponent } from './exam-input/exam-input.component';
import { ViewExamComponent } from './view-exam/view-exam.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { QuestionInputComponent } from './question-input/question-input.component';
import { AdminMeComponent } from './admin-me/admin-me.component';
import { DisplayExamComponent } from './view-exam/display-exam.component';

import { ADMIN_ROUTES } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ADMIN_ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ExamInputComponent,
    ViewExamComponent,
    AdminLoginComponent,
    QuestionInputComponent,
    AdminMeComponent,
    DisplayExamComponent
  ]
})
export class AdminModule { }
