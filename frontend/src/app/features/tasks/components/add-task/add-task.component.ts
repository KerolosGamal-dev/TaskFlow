import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../../../core/services/task.service';
import { Group } from '../../../../shared/models/task.model';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<void>();

  groups: Group[] = [];
  priorities = ['Low', 'Medium', 'High', 'Urgent'];
  
  task = {
    title: '',
    description: '',
    groupId: 'study',
    start: '',
    end: '',
    priority: 'Medium'
  };

  colorOptions = [
    '#009999', // Teal
    '#4CAF50', // Green
    '#FF9800', // Orange
    '#F44336', // Red
    '#9C27B0', // Purple
    '#2196F3', // Blue
    '#E91E63', // Pink
    '#795548'  // Brown
  ];

  showAddGroup = false;
  newGroupName = '';
  newGroupColor = '#009999';

  constructor(private taskService: TaskService) {
    this.groups = this.taskService.getGroups();
  }

  createTask(): void {
    if (this.task.title.trim()) {
      this.taskService.addTask({
        title: this.task.title,
        description: this.task.description,
        groupId: this.task.groupId,
        startDate: new Date(this.task.start),
        endDate: new Date(this.task.end),
        priority: this.task.priority
      });
      this.taskCreated.emit();
    }
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

  goBack(): void {
    this.cancel.emit();
  }

}