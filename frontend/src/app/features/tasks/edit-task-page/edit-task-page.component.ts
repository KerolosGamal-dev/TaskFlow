import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EditTaskComponent } from '../components/edit-task/edit-task.component';

@Component({
  selector: 'app-edit-task-page',
  standalone: true,
  imports: [CommonModule, EditTaskComponent],
  templateUrl: './edit-task-page.component.html',
  styleUrls: ['./edit-task-page.component.css']
})
export class EditTaskPageComponent implements OnInit {
  taskId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id') || '';
  }

  onSaved(): void {
    this.router.navigate(['/todolist']);
  }

  onDeleted(): void {
    this.router.navigate(['/todolist']);
  }

  onCancel(): void {
    this.router.navigate(['/todolist']);
  }
}