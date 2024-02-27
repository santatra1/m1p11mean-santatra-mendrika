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

  insertEmployee(employeeData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employee/create`, employeeData);
  }

  updateEmployee(employeeId: string | null, employeeData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/employee/${employeeId}/update`, employeeData);
  }
  
  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/employee/${employeeId}/delete`);
  }  
}
