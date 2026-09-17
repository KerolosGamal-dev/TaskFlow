import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AddTaskComponent } from '../components/add-task/add-task.component';

@Component({
  selector: 'app-add-task-page',
  standalone: true,
  imports: [CommonModule, AddTaskComponent],
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.css']
})
export class AddTaskPageComponent {
  constructor(private router: Router) {}

  onTaskCreated(): void {
    this.router.navigate(['/dashboard']);
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}