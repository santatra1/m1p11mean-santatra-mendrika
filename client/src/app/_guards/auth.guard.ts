import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const router = inject(Router);
  const authService= inject(AuthService);

  authService.checkTokenExpiration();

  if(authService.isLoggedIn()){
    return true;
  }
  return router.navigate([""]);
};
