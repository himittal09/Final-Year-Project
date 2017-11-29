import { Routes } from '@angular/router';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminMeComponent } from './admin-me/admin-me.component';
import { DisplayExamComponent } from './view-exam/display-exam.component';
import { ExamInputComponent } from './exam-input/exam-input.component';
import { QuestionInputComponent } from './question-input/question-input.component';
import { ViewExamComponent } from './view-exam/view-exam.component';

import { CanActivateAdminComponentGuard } from '../Guards/can-activate-admin-component.guard';
import { CanActivateUnprotectedComponentGuard } from '../Guards/can-activate-unprotected-component.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminMeComponent
  },
  {
    path: 'login',
    component: AdminLoginComponent,
    canActivate: [ CanActivateUnprotectedComponentGuard ]
  },
  {
    path: 'create-exam',
    component: ExamInputComponent,
    canActivate: [ CanActivateAdminComponentGuard ]
  },
  {
    path: 'exam',
    component: ViewExamComponent,
    canActivate: [ CanActivateAdminComponentGuard ]
  },
  {
    path: 'exam/:id/insertque',
    component: QuestionInputComponent,
    canActivate: [ CanActivateAdminComponentGuard ]
  },
  {
    path: 'exam/:id',
    component: DisplayExamComponent,
    canActivate: [ CanActivateAdminComponentGuard ]
  }
];
