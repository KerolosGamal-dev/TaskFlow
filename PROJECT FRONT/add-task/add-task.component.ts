import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<any>();

  groups = [
    { id: 'personal', name: 'Personal', color: '#F43F5E' },
    { id: 'study', name: 'Study', color: '#8B5CF6' },
    { id: 'work', name: 'Work', color: '#10B981' }
  ];
  priorities = ['Low', 'Medium', 'High', 'Urgent'];

  task = { title: '', description: '', groupId: 'study', start: '', end: '', priority: 'Medium' };

  createTask(): void {
    if (this.task.title.trim()) this.taskCreated.emit({ ...this.task });
  }
}