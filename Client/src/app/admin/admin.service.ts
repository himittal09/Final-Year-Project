import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Exam, Question } from '@class/index';
import { environment } from '../../environments/environment';
import { AdminModule } from '@app/admin/admin.module';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  /** empty response from server */
  loginAdmin (password: string): Observable<HttpResponse<null>> {
    return this.http.post<null>(environment.backendUrl + '/admin/login', {password}, { withCredentials: true });
  }

  /** empty response from server */
  checkAdminAuthenticated (): Observable<HttpResponse<null>> {
    return this.http.get<null>(environment.backendUrl + '/admin/me', { withCredentials: true });
  }

  createExam (exam: Exam) :Observable<HttpResponse<Exam>> {
    return this.http.post<Exam>(environment.backendUrl + '/admin/createExam', exam, { withCredentials: true, observe: 'response' });
  }

  putQuestionIntoExam (question: Question, id: string): Observable<HttpResponse<Question>> {
    return this.http.post<Question>(environment.backendUrl + '/admin/exam/' + id + '/insertque', question, { withCredentials: true, observe: 'response' });
  }

  checkExam (id: string): Observable<HttpResponse<Exam>> {
    return this.http.get<Exam>(`${environment.backendUrl}/admin/exam/${id}`, { withCredentials: true, observe: 'response' });
  }

  checkQuestionUnique (questionBody: string): Observable<{[found:string]: boolean}> {
    return this.http.post<{[found:string]: boolean}>(environment.backendUrl + '/admin/question', {questionBody}, { withCredentials: true });
  }

}
