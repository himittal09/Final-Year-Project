import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ExamAttempComponent } from './exam-attemp/exam-attemp.component';
import { ExamQuickResultComponent } from './exam-quick-result/exam-quick-result.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { ExamListComponent } from './exam-list/exam-list.component';

import { EXAM_ROUTES } from './exam-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EXAM_ROUTES),
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule,
    FormsModule
  ],
  declarations: [
    ExamAttempComponent,
    ExamQuickResultComponent,
    ExamResultComponent,
    ExamListComponent
  ]
})
export class ExamModule { }
