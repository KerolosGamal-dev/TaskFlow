import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ForgetPasswordComponent } from './features/auth/forget-password/forget-password.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TodolistComponent } from './features/todolist/todolist.component';
import { AddTaskPageComponent } from './features/tasks/add-task-page/add-task-page.component';
import { EditTaskPageComponent } from './features/tasks/edit-task-page/edit-task-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'todolist', component: TodolistComponent },
  { path: 'add-task', component: AddTaskPageComponent },
  { path: 'edit-task/:id', component: EditTaskPageComponent },
  { path: '**', redirectTo: 'login' }
];