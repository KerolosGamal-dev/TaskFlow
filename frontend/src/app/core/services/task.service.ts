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
    { id: 'personal', name: 'Personal', color: '#009999', isDefault: true },
    { id: 'study', name: 'Study', color: '#4CAF50', isDefault: true },
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

  private tasks: Task[] = [
    {
      id: '1',
      title: 'Complete Angular Project',
      description: 'Finish the dashboard and todolist components',
      startDate: this.getTodayAt(9, 0),    
      endDate: this.getTodayAt(17, 0),       
      groupId: 'work',
      groupName: 'Work',
      groupColor: '#FF9800',
      isCompleted: false,
      priority: 'High',
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Study MEAN Stack',
      description: 'Review Node.js and Express',
      startDate: this.getTodayAt(18, 0),    
      endDate: this.getTodayAt(21, 0),     
      groupId: 'study',
      groupName: 'Study',
      groupColor: '#4CAF50',
      isCompleted: false,
      priority: 'Medium',
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Gym Workout',
      description: 'Cardio and strength training',
      startDate: this.getTodayAt(7, 0),     
      endDate: this.getTodayAt(8, 30),      
      groupId: 'personal',
      groupName: 'Personal',
      groupColor: '#009999',
      isCompleted: true,
      priority: 'Low',
      createdAt: new Date()
    },
    {
      id: '4',
      title: 'Read Book Chapter',
      description: 'Read chapter 5 of Clean Code',
      startDate: this.getTodayAt(20, 0),     
      endDate: this.getTodayAt(21, 30),      
      groupId: 'personal',
      groupName: 'Personal',
      groupColor: '#009999',
      isCompleted: false,
      priority: 'Low',
      createdAt: new Date()
    },
    {
      id: '5',
      title: 'Team Meeting',
      description: 'Weekly sync with the team',
      startDate: this.getTomorrowAt(10, 0), 
      endDate: this.getTomorrowAt(11, 0),  
      groupId: 'work',
      groupName: 'Work',
      groupColor: '#FF9800',
      isCompleted: false,
      priority: 'High',
      createdAt: new Date()
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

  getCurrentUser(): User {
    return this.currentUser;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find(t => t.id === id);
  }

  addTask(taskData: {
    title: string;
    description: string;
    groupId: string;
    startDate: Date;
    endDate: Date;
    priority: string;
  }): void {
    const group = this.groups.find(g => g.id === taskData.groupId);
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      startDate: taskData.startDate,
      endDate: taskData.endDate,
      groupId: taskData.groupId,
      groupName: group?.name || 'Unknown',
      groupColor: group?.color || '#009999',
      isCompleted: false,
      priority: taskData.priority,
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  updateTask(id: string, updatedData: Partial<Task>): void {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      if (updatedData.groupId) {
        const group = this.groups.find(g => g.id === updatedData.groupId);
        if (group) {
          updatedData.groupName = group.name;
          updatedData.groupColor = group.color;
        }
      }
      this.tasks[index] = { ...this.tasks[index], ...updatedData };
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

  addGroup(group: Group): void {
    this.groups.push(group);
  }

  deleteGroup(groupId: string): void {
    const group = this.groups.find(g => g.id === groupId);
    if (group && !group.isDefault) {
      this.groups = this.groups.filter(g => g.id !== groupId);
    }
  }

  getGroups(): Group[] {
    return this.groups;
  }
}