import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ServiceComponent } from './clients/service/service.component';
import { WelcomeComponent } from './manager/welcome/welcome.component';

export const routes: Routes = [
  { path: 'service', component: ServiceComponent },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'manager', component: WelcomeComponent },
];
