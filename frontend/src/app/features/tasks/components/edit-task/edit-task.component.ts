import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../../core/services/task.service';
import { Group, Task } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() taskId: string = '';
  @Output() cancel = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();

  groups: Group[] = [];
  priorities = ['Low', 'Medium', 'High', 'Urgent'];
  
  colorOptions = [
    '#009999',
    '#4CAF50', 
    '#FF9800', 
    '#F44336',
    '#9C27B0', 
    '#2196F3', 
    '#E91E63', 
    '#795548'
  ];

  showAddGroup = false;
  newGroupName = '';
  newGroupColor = '#009999';

  task: any = {};

  constructor(private taskService: TaskService) {
    this.groups = this.taskService.getGroups();
  }

  ngOnInit(): void {
    if (this.taskId) {
      const found = this.taskService.getTaskById(this.taskId);
      if (found) {
        this.task = {
          title: found.title,
          description: found.description,
          groupId: found.groupId,
          start: this.formatDateTimeLocal(found.startDate),
          end: this.formatDateTimeLocal(found.endDate),
          priority: found.priority || 'Medium'
        };
      }
    }
  }

  formatDateTimeLocal(date: Date): string {
    const d = new Date(date);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  addNewGroup(): void {
    if (this.newGroupName.trim()) {
      const newGroup: Group = {
        id: Date.now().toString(),
        name: this.newGroupName.trim(),
        color: this.newGroupColor,
        isDefault: false
      };
      
      this.taskService.addGroup(newGroup);
      this.groups = this.taskService.getGroups();
      this.task.groupId = newGroup.id;
      
      this.showAddGroup = false;
      this.newGroupName = '';
      this.newGroupColor = '#009999';
    }
  }

  cancelAddGroup(): void {
    this.showAddGroup = false;
    this.newGroupName = '';
    this.newGroupColor = '#009999';
  }

  saveChanges(): void {
    this.taskService.updateTask(this.taskId, {
      title: this.task.title,
      description: this.task.description,
      groupId: this.task.groupId,
      startDate: new Date(this.task.start),
      endDate: new Date(this.task.end),
      priority: this.task.priority
    });
    this.saved.emit();
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.taskId);
    this.deleted.emit();
  }

  goBack(): void {
    this.cancel.emit();
  }
}