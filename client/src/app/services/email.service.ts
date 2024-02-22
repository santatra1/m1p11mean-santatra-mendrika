import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, templateFileName: string, content: any): Observable<any> {
    const body = { to, subject, templateFileName, content };
    return this.http.post(`${this.apiUrl}/send-email`, body);
  }
}
