import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee } from '../_intefaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getEmployeeById(id: string | null){
    return this.http.get<{ employee: Employee }>(`${this.apiUrl}/employee/${id}`).pipe(
      map(response => response.employee)
    );
  }

  getEmployeeByUserId(id: string | null){
    return this.http.get<{ employee: Employee }>(`${this.apiUrl}/employee/user/${id}`).pipe(
      map(response => response.employee)
    );
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<{ employees: Employee[] }>(`${this.apiUrl}/employee`).pipe(
      map(response => response.employees)
    );
  }

  getEmployeesByServiceId(serviceId: string | null): Observable<Employee[]> {
    return this.http.get<{ employees: Employee[] }>(`${this.apiUrl}/employee/service/${serviceId}`).pipe(
      map(response => response.employees)
    );
  }

  insertEmployee(employeeData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employee/create`, employeeData);
  }

  updateEmployee(employeeId: string | null, employeeData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/employee/${employeeId}/update`, employeeData);
  }
  
  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/employee/${employeeId}/delete`);
  }

  calculDuree(heureDebut:string  | undefined, heureFin:string | undefined) {
    if(heureDebut && heureFin){
      const [heuresDebut, minutesDebut] = heureDebut.split(':').map(Number);
      const [heuresFin, minutesFin] = heureFin.split(':').map(Number);
  
      const totalMinutesDebut = heuresDebut * 60 + minutesDebut;
      const totalMinutesFin = heuresFin * 60 + minutesFin;
  
      let differenceMinutes = totalMinutesFin - totalMinutesDebut;
  
      // Gérer le cas où l'heure de fin est avant l'heure de début (p. ex. pour une période qui traverse minuit)
      if (differenceMinutes < 0) {
        differenceMinutes += 24 * 60; // Ajouter une journée en minutes
      }
  
      // Convertir la différence en heures et minutes
      const heures = Math.floor(differenceMinutes / 60);
      const minutes = differenceMinutes % 60;
  
      // Retourner la durée au format 'hh:mm'
      return `${heures}h${minutes < 10 ? '0' : ''}${minutes}`;
    }
    return "";
  }

  getCommissionMonitoring(employeeId: string | null, date:Date){
    return this.http.get<any>(`${this.apiUrl}/employee/commission-monitoring/${employeeId}/${date}`);
  }

}
