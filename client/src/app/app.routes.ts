import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ServiceComponent } from './clients/service/service.component';
import { authGuard } from './_guards/auth.guard';
import { roleGuard } from './_guards/role.guard';
import { DashboardComponent } from './managers/dashboard/dashboard.component';
import { ServicesComponent } from './managers/services/services.component';
import { SidebarComponent } from './managers/sidebar/sidebar.component';
import { IndexComponent as EmployeeList } from './managers/employees/index/index.component';
import { CreateComponent as EmployeeCreate } from './managers/employees/create/create.component';
import { EditComponent as EmployeeEdit } from './managers/employees/edit/edit.component';
import { NavbarComponent as ClientNavBar } from './clients/_layouts/navbar/navbar.component';
import { DemandeDeRendezVousComponent } from './clients/demande-de-rendez-vous/demande-de-rendez-vous.component';
import { OfferSpecialComponent } from './managers/offer-special/offer-special.component';


export const routes: Routes = [
  {
    path: 'client', component: ClientNavBar, canActivate: [authGuard, roleGuard], data: { role: 'client' },
    children: [
      { path: 'service', component: ServiceComponent },
      { path: 'demande-de-rendez-vous/:serviceId', component: DemandeDeRendezVousComponent },
    ]
  },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'manager', component: SidebarComponent, canActivate: [authGuard, roleGuard], data: { role: 'manager' },
    children: [
      { path: '', component: DashboardComponent },
      { path: 'service', component: ServicesComponent },
      { path: 'employee', component: EmployeeList },
      { path: 'employee/create', component: EmployeeCreate },
      { path: 'employee/:id/edit', component: EmployeeEdit },
      { path: 'special-offer', component: OfferSpecialComponent },
    ]
  },
];
