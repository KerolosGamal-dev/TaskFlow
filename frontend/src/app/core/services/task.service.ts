import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task, Group, User } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private currentUser: User = {
    id: '1',
    name: 'David',
    email: 'david@example.com'
  };

  private groups: Group[] = [
    { id: 'personal', name: 'Personal', color: '#1470e0', isDefault: true },
    { id: 'study', name: 'Study', color: '#a74caf', isDefault: true },
    { id: 'work', name: 'Work', color: '#FF9800', isDefault: true }
  ];

  private getTodayAt(hour: number, minute: number = 0): Date {
    const today = new Date();
    today.setHours(hour, minute, 0, 0);
    return today;
  }

  private getTomorrowAt(hour: number, minute: number = 0): Date {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(hour, minute, 0, 0);
    return tomorrow;
  }

  private tasksSubject = new BehaviorSubject<Task[]>([]);

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getTodayTasks(): Task[] {return[];}

  getTasksByDate(date: Date): Task[] {return[];}

  getCurrentUser(): User {
    return this.currentUser;
  }

  getTaskById(id: string): Task | undefined {return undefined}

  addTask(taskData: any) : void {}

  updateTask(id: string, data: any): void {}

  deleteTask(id: string): void {}

  toggleTaskCompletion(id: string): void {}

  addGroup(group: Group): void {
    this.groups.push(group);
  }

  deleteGroup(groupId: string): void {}

  getGroups(): Group[] {
    return this.groups;
  }
}