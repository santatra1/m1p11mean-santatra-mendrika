import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<{ _id: string; name: string }[]> {
    return this.http
      .get<{ _id: string; name: string }[]>(`${this.apiUrl}/roles`)
      .pipe(map((roles) => roles.sort((a, b) => a.name.localeCompare(b.name))));
  }
}
