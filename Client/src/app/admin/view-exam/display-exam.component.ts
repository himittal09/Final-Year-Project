import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AdminService } from '../admin.service';
import { Exam, Question } from '@class/index';

@Component({
  selector: 'fyp-display-exam',
  templateUrl: './display-exam.component.html',
  styleUrls: ['./view-exam.component.css']
})
export class DisplayExamComponent implements OnInit {

  id: string;
  subscription: Subscription;
  submissionError = -1;
  exam: Exam;
  question: Question;
  selectedQuestionNumber: number;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.subscription = this.adminService.checkExam(this.id).subscribe((response: HttpResponse<Exam>) => {
      this.submissionError = 0;
      this.exam = response.body;
      if (this.exam.questions.length) {
        this.question = this.exam.questions[0];
        this.selectedQuestionNumber = 1;
      }
    }, (error: any) => {
      if (error.status === 401) {
        this.submissionError = 1;
        // 401 unauthorised
      } else if (error.status === 400) {
        this.submissionError = 2;
        // 400 invalid exam id
      } else if (error.status === 404) {
        this.submissionError = 3;
        // 404 exam not found
      } else {
        this.submissionError = 4;
        // 500 any internal error
      }
    }, () => {
      this.subscription.unsubscribe();
    });
  }

  selectQuestionForDisplay (questionId: string, questionNumber: number): void {
    this.question = this.exam.questions.find(question => question._id === questionId);
    this.selectedQuestionNumber = questionNumber;
  }

}
