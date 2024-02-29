import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ServiceComponent } from './clients/service/service.component';
import { authGuard } from './_guards/auth.guard';
import { roleGuard } from './_guards/role.guard';
import { DashboardComponent as ManagersDashboard } from './managers/dashboard/dashboard.component';
import { DashboardComponent as EmployeeDashboard } from './employee/dashboard/dashboard.component';
import { ServicesComponent } from './managers/services/services.component';
import { SidebarComponent as ManagersSidebar } from './managers/_components/sidebar/sidebar.component';
import { SidebarComponent as EmployeesSidebar } from './employee/_components/sidebar/sidebar.component';
import { IndexComponent as EmployeeList } from './managers/employees/index/index.component';
import { CreateComponent as EmployeeCreate } from './managers/employees/create/create.component';
import { EditComponent as ManagerEmployeeEdit } from './managers/employees/edit/edit.component';
import { NavbarComponent as ClientNavBar } from './clients/_layouts/navbar/navbar.component';
import { DemandeDeRendezVousComponent } from './clients/demande-de-rendez-vous/demande-de-rendez-vous.component';
import { OfferSpecialComponent } from './managers/offer-special/offer-special.component';
import { ProfilComponent } from './employee/profil/profil.component';
import { RendezVousComponent as EmployeeRendezVous } from './employee/rendez-vous/rendez-vous.component';
import { TarifComponent } from './clients/tarif/tarif.component';
import { RendezVousComponent } from './clients/rendez-vous/rendez-vous.component';

export const routes: Routes = [
  {
    path: 'client', component: ClientNavBar, canActivate: [authGuard, roleGuard], data: { role: 'client' },
    children: [
      { path: 'service', component: ServiceComponent },
      { path: 'demande-de-rendez-vous/:serviceId', component: DemandeDeRendezVousComponent },
      { path: 'rendez-vous', component: RendezVousComponent },
      { path: 'tarifs', component: TarifComponent },
    ]
  },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'manager', component: ManagersSidebar, canActivate: [authGuard, roleGuard], data: { role: 'manager' },
    children: [
      { path: 'tableau-de-bord', component: ManagersDashboard },
      { path: 'service', component: ServicesComponent },
      { path: 'employee', component: EmployeeList },
      { path: 'employee/create', component: EmployeeCreate },
      { path: 'employee/:id/edit', component: ManagerEmployeeEdit },
      { path: 'special-offer', component: OfferSpecialComponent },
    ]
  },
  {
    path: 'employee', component: EmployeesSidebar, canActivate: [authGuard, roleGuard], data: { role: 'employee' },
    children: [
      { path: 'tableau-de-bord', component: EmployeeDashboard },
      { path: 'profil', component: ProfilComponent },
      { path: 'rendez-vous', component: EmployeeRendezVous },
    ]
  },
];
