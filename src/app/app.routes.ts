import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: '**', redirectTo: 'login' }
];
