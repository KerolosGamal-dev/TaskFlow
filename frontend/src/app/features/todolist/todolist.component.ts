import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../core/services/task.service';
import { Task, Group } from '../../shared/models/task.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todolist',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css'
})
export class TodolistComponent implements OnInit {
  tasks: Task[] = [];
  groups: Group[] = [];
  selectedDate: Date = new Date();
  selectedGroup: string = 'all';
  searchQuery: string = '';
  viewMode: 'list' | 'grid' = 'list';

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.groups = this.taskService.getGroups();
    
    // استقبال الفلتر من الداشبورد
    this.route.queryParams.subscribe(params => {
      if (params['group']) {
        this.selectedGroup = params['group'];
      }
    });
    
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasksByDate(this.selectedDate);
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.taskService.getTasksByDate(this.selectedDate);

    if (this.selectedGroup !== 'all') {
      filtered = filtered.filter(task => task.groupId === this.selectedGroup);
    }

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    this.tasks = filtered;
  }

  onDateChange(event: any): void {
    this.selectedDate = new Date(event.target.value);
    this.loadTasks();
  }

  onGroupFilterChange(): void {
    this.applyFilters();
  }

  onSearch(): void {
    this.applyFilters();
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  toggleTask(task: Task): void {
    task.isCompleted = !task.isCompleted;
  }

  deleteTask(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    }
  }

  getGroupById(id: string): Group | undefined {
    return this.groups.find(g => g.id === id);
  }
}