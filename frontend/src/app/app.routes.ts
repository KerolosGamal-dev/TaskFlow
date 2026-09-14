import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TodolistComponent } from './features/todolist/todolist.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'todolist', component: TodolistComponent },
  { path: '**', redirectTo: '/dashboard' }
];