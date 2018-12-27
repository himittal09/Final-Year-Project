import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ExamModule } from '@app/exam/exam.module';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  getExamList (): Observable<any> {
    return this.http.get('http://localhost:3000/exam', { withCredentials: true });
  }

  getExam (id: string): Observable<any> {
    return this.http.get('http://localhost:3000/exam/' + id, { withCredentials: true });
  }

  submitExam (id: string, exam: any): Observable<any> {
    return this.http.post('http://localhost:3000/exam/submit/' + id, exam, { withCredentials: true });
  }

  getExamQuickResult (id: string): Observable<any> {
    return this.http.get('http://localhost:3000/exam/quick/' + id, { withCredentials: true });
  }

  getExamResult (id: string): Observable<any> {
    return this.http.get('http://localhost:3000/exam/result/' + id, { withCredentials: true });
  }

}
