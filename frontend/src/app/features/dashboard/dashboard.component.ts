import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { LanguageService } from '../../core/services/language.service';
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
  currentLang = 'en';
  
  stats = {
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  };

  groupTaskCounts: { [key: string]: number } = {};

  constructor(
    private taskService: TaskService,
    private languageService: LanguageService,
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
    
    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.setGreeting();
    });
  }

  getPendingTasks(): Task[] {
    const allTasks = this.taskService.getTodayTasks();
    return allTasks.filter(t => !t.isCompleted);
  }

  setGreeting(): void {
    const hour = new Date().getHours();
    if (hour < 12) {
      this.greeting = this.languageService.translate('goodMorning');
    } else if (hour < 18) {
      this.greeting = this.languageService.translate('goodAfternoon');
    } else {
      this.greeting = this.languageService.translate('goodEvening');
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
    
    if (diff <= 0) return this.languageService.translate('expired');
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m ${this.languageService.translate('left')}`;
  }

  formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }

  toggleTask(task: Task): void {
    this.taskService.toggleTaskCompletion(task.id);
    this.todayTasks = this.taskService.getTodayTasks();
    this.pendingTasks = this.getPendingTasks();
    this.calculateStats();
    this.calculateGroupCounts();
  }

  navigateToEdit(taskId: string): void {
    this.router.navigate(['/edit-task', taskId]);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}