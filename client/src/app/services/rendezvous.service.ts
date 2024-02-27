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

  createRendezVous(rendezvousData: any){
    return this.http.post<any>(`${this.apiUrl}/rendezvous/create`, rendezvousData);
  }

}