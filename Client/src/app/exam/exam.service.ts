import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Exam, ExamReturn } from '@class/index';
import { environment } from '../../environments/environment';
import { ExamModule } from '@app/exam/exam.module';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  getExamList (): Observable<HttpResponse<any>> {
    return this.http.get(environment.backendUrl + '/exam', { withCredentials: true, observe: 'response' });
  }

  getExam (id: string): Observable<HttpResponse<Exam>> {
    return this.http.get<Exam>(environment.backendUrl + '/exam/' + id, { withCredentials: true, observe: 'response' });
  }

  submitExam (id: string, exam: any): Observable<null> {
    return this.http.post<null>(environment.backendUrl + '/exam/submit/' + id, exam, { withCredentials: true });
  }

  getExamQuickResult (id: string): Observable<HttpResponse<ExamReturn>> {
    return this.http.get<ExamReturn>(environment.backendUrl + '/exam/quick/' + id, { withCredentials: true, observe: 'response' });
  }

  getExamResult (id: string): Observable<HttpResponse<any>> {
    return this.http.get(environment.backendUrl + '/exam/result/' + id, { withCredentials: true, observe: 'response' });
  }

}
