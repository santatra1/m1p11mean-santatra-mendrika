import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ServiceComponent } from './clients/service/service.component';
import { authGuard } from './_guards/auth.guard';
import { roleGuard } from './_guards/role.guard';
import { DashboardComponent } from './managers/dashboard/dashboard.component';
import { ServicesComponent } from './managers/services/services.component';
import { SidebarComponent } from './managers/sidebar/sidebar.component';

export const routes: Routes = [
  { path: 'service', component: ServiceComponent, canActivate: [authGuard,roleGuard],data: { role: 'client' } },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'manager', component: SidebarComponent, canActivate: [authGuard,roleGuard],data: { role: 'manager' },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'service', component: ServicesComponent }
    ] },
];
