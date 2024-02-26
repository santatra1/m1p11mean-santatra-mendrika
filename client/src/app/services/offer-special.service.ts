import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferSpecialService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  sendOfferSpecial(offerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/special-offer`, offerData);
  }
}
