import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  @Input() task: any = {};
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();
  @Output() delete = new EventEmitter<void>();

  groups = [
    { id: 'personal', name: 'Personal', color: '#F43F5E' },
    { id: 'study', name: 'Study', color: '#8B5CF6' },
    { id: 'work', name: 'Work', color: '#10B981' }
  ];
  priorities = ['Low', 'Medium', 'High', 'Urgent'];
}