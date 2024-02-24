import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { ICredential } from '../_intefaces/icredential';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = environment.apiUrl;
  private tokenKey = "access_token";

  constructor(private http: HttpClient, public router: Router) { }

  signIn(user: ICredential){
    return this.http
    .post<any>(`${this.apiUrl}/login`, user);
  }

  saveToken(token: string): void{
    localStorage.setItem(this.tokenKey,token)
    this.redirectAfterSignIn();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  redirectAfterSignIn(){
    const roleUser = this.getTokenPayload().role;

    if(roleUser){
      switch(roleUser){
        case "client":
          this.router.navigate(["client/service"])
          break
        case "manager":
          this.router.navigate(["manager"])
          break
        default:
          this.router.navigate([""])

      }
    }else{
      this.doLogout();
    }
  }

  isLoggedIn(): boolean {
    const authToken = localStorage.getItem(this.tokenKey);
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem(this.tokenKey);
    if (removeToken == null) {
      this.router.navigate(['']);
    }
  }

  getTokenPayload(){
    const token = this.getToken();
    if(token){
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload;
    }
    return null;
  }

  checkTokenExpiration(): void {
      const tokenPayloadExp = this.getTokenPayload().exp;
      if(tokenPayloadExp){
        const expirationTime = tokenPayloadExp * 1000; 
        const currentTime = Date.now();
        if (currentTime > expirationTime) {
          this.doLogout();
        }
      }else{
        this.doLogout();
      }
  }
}
