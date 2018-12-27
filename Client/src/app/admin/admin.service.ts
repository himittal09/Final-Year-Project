import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Exam, Question } from '@class/index';
import { AdminModule } from '@app/admin/admin.module';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  loginAdmin (password: string): Observable<any> {
    return this.http.post('http://localhost:3000/admin/login', {password}, { withCredentials: true });
  }

  checkAdminAuthenticated (): Observable<any> {
    return this.http.get('http://localhost:3000/admin/me', { withCredentials: true });
  }

  createExam (exam: Exam): Observable<any> {
    return this.http.post('http://localhost:3000/admin/createExam', exam, { withCredentials: true });
  }

  putQuestionIntoExam (question: Question, id: string): Observable<any> {
    return this.http.post('http://localhost:3000/admin/exam/' + id + '/insertque', question, { withCredentials: true });
  }

  checkExam (id: string): Observable<any> {
    return this.http.get('http://localhost:3000/admin/exam/' + id, { withCredentials: true });
  }

  checkQuestionUnique (questionBody: string): Observable<any> {
    return this.http.post('http://localhost:3000/admin/question', {questionBody}, { withCredentials: true });
  }

}
