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
    { id: '1', name: 'Personal', color: '#009999', isDefault: true },
    { id: '2', name: 'Study', color: '#4CAF50', isDefault: true },
    { id: '3', name: 'Work', color: '#FF9800', isDefault: true }
  ];

  private tasks: Task[] = [
    {
      id: '1',
      title: 'Complete Angular Project',
      description: 'Finish the dashboard and todolist components',
      startDate: new Date('2026-09-14T09:00:00'),
      endDate: new Date('2026-09-14T17:00:00'),
      groupId: '3',
      groupName: 'Work',
      groupColor: '#FF9800',
      isCompleted: false,
      createdAt: new Date('2026-09-10')
    },
    {
      id: '2',
      title: 'Study MEAN Stack',
      description: 'Review Node.js and Express',
      startDate: new Date('2026-09-14T18:00:00'),
      endDate: new Date('2026-09-14T21:00:00'),
      groupId: '2',
      groupName: 'Study',
      groupColor: '#4CAF50',
      isCompleted: false,
      createdAt: new Date('2026-09-11')
    },
    {
      id: '3',
      title: 'Gym Workout',
      description: 'Cardio and strength training',
      startDate: new Date('2026-09-14T07:00:00'),
      endDate: new Date('2026-09-14T08:30:00'),
      groupId: '1',
      groupName: 'Personal',
      groupColor: '#009999',
      isCompleted: true,
      createdAt: new Date('2026-09-12')
    }
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  
  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getTodayTasks(): Task[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.tasks.filter(task => {
      const taskDate = new Date(task.startDate);
      return taskDate >= today && taskDate < tomorrow;
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }

  getTasksByDate(date: Date): Task[] {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.tasks.filter(task => {
      const taskDate = new Date(task.startDate);
      return taskDate >= startOfDay && taskDate <= endOfDay;
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }

  getGroups(): Group[] {
    return this.groups;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  addTask(task: Omit<Task, 'id' | 'createdAt'>): void {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  updateTask(id: string, updatedTask: Partial<Task>): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...updatedTask };
      this.tasksSubject.next([...this.tasks]);
    }
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next([...this.tasks]);
  }

  toggleTaskCompletion(id: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.isCompleted = !task.isCompleted;
      this.tasksSubject.next([...this.tasks]);
    }
  }
}