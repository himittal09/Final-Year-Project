import { Routes } from '@angular/router';

import { ExamAttempComponent } from './exam-attemp/exam-attemp.component';
import { ExamQuickResultComponent } from './exam-quick-result/exam-quick-result.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { ExamListComponent } from './exam-list/exam-list.component';

import {
  CanDeactivateComponent,
  CanActivateUserComponentGuard,
  CanAccessUserComponentGuard
} from '@app/shared/guard/index';

export const EXAM_ROUTES: Routes = [
  {
    path: ':id',
    component: ExamAttempComponent,
    canActivate: [ CanActivateUserComponentGuard ],
    canDeactivate: [ CanDeactivateComponent ]
  },
  {
    path: 'submit/:id',
    component: ExamQuickResultComponent,
    canActivate: [ CanActivateUserComponentGuard ]
  },
  {
    path: 'result/:id',
    component: ExamResultComponent,
    canActivate: [ CanActivateUserComponentGuard ]
  },
  {
    path: '',
    component: ExamListComponent
  },
];
