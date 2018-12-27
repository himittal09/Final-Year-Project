import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs';

import { Exam } from '@class/index';
import { ExamService } from '@app/exam/exam.service';

@Component({
  selector: 'fyp-view-exam',
  templateUrl: './view-exam.component.html',
  styleUrls: ['./view-exam.component.css']
})
export class ViewExamComponent implements OnInit {

  examList: Exam[];
  subscription: Subscription;
  isexamFetchingFailure = -1;

  constructor(
    private examService: ExamService
  ) { }

  ngOnInit() {
    this.subscription = this.examService.getExamList().subscribe((response: Response) => {
      this.examList = response.json();
      this.isexamFetchingFailure = 0;
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
      throw error;
    }, () => {
      this.subscription.unsubscribe();
    });
  }

}
