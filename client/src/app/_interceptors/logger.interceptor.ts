import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  if(authService.isLoggedIn()){ 
    req = req.clone({
      setHeaders: {
          Authorization: "Bearer " + authService.getToken()
      }
    });
  }
  return next(req);
};
