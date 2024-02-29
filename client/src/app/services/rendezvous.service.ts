import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getRendezVousByEmployee(employeeId: string | null, date: string | null){
    return this.http.get<any[]>(`${this.apiUrl}/rendezvous/${employeeId}/${date}`);
  }

  getRendezVousByClient(clientId: string | null){
    return this.http.get<any[]>(`${this.apiUrl}/rendezvous/client/${clientId}`);
  }

  createRendezVous(rendezvousData: any){
    return this.http.post<any>(`${this.apiUrl}/rendezvous/create`, rendezvousData);
  }

  getDailyAppointmentCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/rendezvous/daily-count`);
  }
  
  getMonthlyAppointmentCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/rendezvous/monthly-count`);
  }
}
