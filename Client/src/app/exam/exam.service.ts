import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { env_config } from '../../environments/env';

@Injectable()
export class ExamService {

  constructor(private http: Http) { }

  getExamList (): Observable<Response> {
    return this.http.get(env_config.api_path + 'exam', { withCredentials: true });
  }

  getExam (id: string): Observable<Response> {
    return this.http.get(env_config.api_path + 'exam/' + id, { withCredentials: true });
  }

  submitExam (id: string, exam: any): Observable<Response> {
    return this.http.post(env_config.api_path + 'exam/submit/' + id, exam, { withCredentials: true });
  }

  getExamQuickResult (id: string): Observable<Response> {
    return this.http.get(env_config.api_path + 'exam/quick/' + id, { withCredentials: true });
  }

  getExamResult (id: string): Observable<any> {
    return this.http.get(env_config.api_path + 'exam/result/' + id, { withCredentials: true }).map(res => res.json());
  }

}
