import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Exam } from '@class/index';
import { ExamService } from '../exam.service';
import { SharedService } from '@app/shared/shared.service';

@Component({
  selector: 'fyp-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.css']
})
export class ExamListComponent implements OnInit {

  examList: Exam[];
  subscription: Subscription;
  isexamFetchingFailure = -1;
  examReturns: string[];
  selectedExam: Exam;

  constructor(
    private examService: ExamService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    if (!this.sharedService.isUserAuthenticated) {
      this.isexamFetchingFailure = 1;
      return;
    }
    this.subscription = this.examService.getExamList().subscribe((response: HttpResponse<any>) => {
      this.examList = response.body.exams;
      this.examReturns = response.body.examReturns;
      this.isexamFetchingFailure = 0;
      this.examList.forEach((exam) => {
        exam.hasUserAttempted = this.examReturns.includes(exam._id);
      });
    }, (error: any) => {
      if (error.status === 401) {
        this.isexamFetchingFailure = 1;
        // 401 unauthorised
      } else if (error.status === 501 || error.status === 500) {
        this.isexamFetchingFailure = 2;
        // 501 internal server eror unable to fetch user
      } else {
        this.isexamFetchingFailure = 3;
        // 404 no exam found
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  redirecttoExam(): void {

    const elem = document.documentElement; // Make the body go full screen.
    this.requestFullScreen(elem);

    this.router.navigate(['exam', this.selectedExam._id]);
  }

  selectExam (examId: string): void {
    this.selectedExam = this.examList.find(exam => exam._id === examId);
  }

  redirectToResult(examId: string): void {
    this.router.navigate(['exam', 'result', examId]);
  }

  requestFullScreen (element: any): void {
    // Supports most browsers and their versions.
    if (element.requestFullScreen) {
      element.requestFullScreen();
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullScreen) {
      element.msRequestFullScreen();
    }
  }

}
