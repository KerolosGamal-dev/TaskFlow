import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task, Group, User } from '../../shared/models/task.model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  currentUser!: User;
  todayTasks: Task[] = [];
  pendingTasks: Task[] = [];
  groups: Group[] = [];
  today = new Date();
  greeting = '';
  
  stats = {
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  };

  groupTaskCounts: { [key: string]: number } = {};

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.taskService.getCurrentUser();
    this.todayTasks = this.taskService.getTodayTasks();
    this.groups = this.taskService.getGroups();
    this.pendingTasks = this.getPendingTasks();
    this.setGreeting();
    this.calculateStats();
    this.calculateGroupCounts();
  }

  getPendingTasks(): Task[] {
    const allTasks = this.taskService.getTodayTasks();
    return allTasks.filter(t => !t.isCompleted);
  }

  setGreeting(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour < 18) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }
  }

  calculateStats(): void {
    const allTasks = this.todayTasks;
    this.stats.total = allTasks.length;
    this.stats.completed = allTasks.filter(t => t.isCompleted).length;
    this.stats.pending = allTasks.filter(t => !t.isCompleted).length;
    this.stats.overdue = 0;
  }

  calculateGroupCounts(): void {
    const allTasks = this.taskService.getTodayTasks();
    this.groups.forEach(group => {
      this.groupTaskCounts[group.id] = allTasks.filter(t => t.groupId === group.id).length;
    });
  }

  onGroupClick(groupId: string): void {
    this.router.navigate(['/todolist'], { 
      queryParams: { group: groupId } 
    });
  }

  getTimeLeft(endDate: Date): string {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m left`;
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
    this.calculateStats();
    this.pendingTasks = this.getPendingTasks();
  }
}