import { CanActivateFn } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRole = route.data['role'];
  const currentUserRole = authService.getTokenPayload().role;
  console.log("role:")
  console.log(expectedRole)

  if (currentUserRole === expectedRole) {
    return true;
  }
  return router.navigate([""]);
};
