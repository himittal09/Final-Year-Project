import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Exam } from '../../Classes';
import { ExamService } from '../exam.service';
import { IsAuthenticatedService } from '../../Shared/is-authenticated.service';

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
    private isAuthenticatedService: IsAuthenticatedService
  ) { }

  ngOnInit() {
    this.subscription = this.examService.getExamList().subscribe((response: Response) => {
      this.examList = response.json().exams;
      this.examReturns = response.json().examReturns;
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
