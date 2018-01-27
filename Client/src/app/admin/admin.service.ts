import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { env_config } from '../../environments/env';

import { Exam, Question } from '../Classes';

@Injectable()
export class AdminService {

  constructor(private http: Http) {}

  loginAdmin (password: string): Observable<Response> {
    return this.http.post(env_config.api_path + 'admin/login', {password}, { withCredentials: true });
  }

  checkAdminAuthenticated (): Observable<Response> {
    return this.http.get(env_config.api_path + 'admin/me', { withCredentials: true });
  }

  logoutAdmin (): Observable<Response> {
    return this.http.delete(env_config.api_path + 'admin/logout', { withCredentials: true });
  }

  createExam (exam: Exam): Observable<Response> {
    return this.http.post(env_config.api_path + 'admin/createExam', exam, { withCredentials: true });
  }

  putQuestionIntoExam (question: Question, id: string): Observable<Response> {
    return this.http.post(env_config.api_path + 'admin/exam/' + id + '/insertque', question, { withCredentials: true });
  }

  checkExam (id: string): Observable<Response> {
    return this.http.get(env_config.api_path + 'admin/exam/' + id, { withCredentials: true });
  }

  checkQuestionUnique (questionBody: string): Observable<Response> {
    return this.http.post(env_config.api_path + 'admin/question', {questionBody}, { withCredentials: true });
  }

}
