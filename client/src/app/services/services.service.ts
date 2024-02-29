import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Service } from '../_intefaces/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  insertService(serviceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/service`, serviceData);
  }

  getById(serviceId: string | null){
    return this.http.get<{ service: Service }>(`${this.apiUrl}/service/${serviceId}`).pipe(
      map(response => response.service)
    );
  }

  getServices(): Observable<Service[]> {
    return this.http.get<{ services: Service[] }>(`${this.apiUrl}/service`).pipe(
      map(response => response.services)
    );
  }
  updateService(serviceId: string, serviceData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/service/${serviceId}`, serviceData);
  }
  deleteService(serviceId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/service/${serviceId}`);
  }
  getTurnOverMonthly(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/monthly-turnover`);
  }

  getTurnOverForCurrentDay(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/daily-turnover`);
  }
  
}
