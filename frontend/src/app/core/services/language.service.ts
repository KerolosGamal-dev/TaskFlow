import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLangSubject.asObservable();

  private translations: Record<string, Record<string, string>> = {
    en: {
      // Navigation
      dashboard: 'Dashboard',
      todolist: 'Task List',
      addTask: 'Add Task',
      search: 'Search tasks...',
      home: 'Home',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout',
      notifications: 'Notifications',
      noNotifications: 'No new notifications',
      
      // Dashboard
      goodMorning: 'Good Morning',
      goodAfternoon: 'Good Afternoon',
      goodEvening: 'Good Evening',
      addNewTask: 'Add New Task',
      totalTasks: 'Total Tasks',
      completed: 'Completed',
      pending: 'Pending',
      overdue: 'Overdue',
      todayTasks: "Today's Tasks",
      viewAll: 'View All',
      noTasksToday: 'No tasks for today!',
      enjoyFreeTime: 'Enjoy your free time or add a new task.',
      addTaskBtn: 'Add Task',
      pendingTasks: 'Pending Tasks',
      yourGroups: 'Your Groups',
      tasksToday: 'tasks today',
      defaultGroup: 'Default Group',
      customGroup: 'Custom Group',
      expired: 'Expired',
      left: 'left',
      allTasksCompleted: 'All tasks completed!',
      
      // Footer
      footerTagline: 'Organize your time, achieve your goals',
      footerCredit: 'Developed with by Task Flow Team',
      footerRights: '© 2026 Task Flow. All rights reserved.',
      socialFollow: 'FOLLOW US',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us'
    },
    ar: {
      // Navigation
      dashboard: 'لوحة التحكم',
      todolist: 'قائمة المهام',
      addTask: 'إضافة مهمة',
      search: 'ابحث عن المهام...',
      home: 'الرئيسية',
      settings: 'الإعدادات',
      profile: 'الملف الشخصي',
      logout: 'تسجيل الخروج',
      notifications: 'الإشعارات',
      noNotifications: 'لا توجد إشعارات جديدة',
      
      // Dashboard
      goodMorning: 'صباح الخير',
      goodAfternoon: 'مساء الخير',
      goodEvening: 'مساء الخير',
      addNewTask: 'إضافة مهمة جديدة',
      totalTasks: 'إجمالي المهام',
      completed: 'مكتملة',
      pending: 'قيد الانتظار',
      overdue: 'متأخرة',
      todayTasks: 'مهام اليوم',
      viewAll: 'عرض الكل',
      noTasksToday: 'لا توجد مهام لليوم!',
      enjoyFreeTime: 'استمتع بوقت فراغك أو أضف مهمة جديدة.',
      addTaskBtn: 'إضافة مهمة',
      pendingTasks: 'المهام المعلقة',
      yourGroups: 'مجموعاتك',
      tasksToday: 'مهمة اليوم',
      defaultGroup: 'مجموعة افتراضية',
      customGroup: 'مجموعة مخصصة',
      expired: 'منتهية',
      left: 'متبقي',
      allTasksCompleted: 'جميع المهام مكتملة!',
      
      // Footer
      footerTagline: 'نظّم وقتك، حقق أهدافك',
      footerCredit: 'تم التطوير بواسطة فريق Task Flow',
      footerRights: '© 2026 Task Flow. جميع الحقوق محفوظة.',
      socialFollow: 'تابعنا',
      quickLinks: 'روابط سريعة',
      contactUs: 'تواصل معنا'
    }
  };

  constructor() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.setLanguage(savedLang as 'en' | 'ar');
    }
  }

  setLanguage(lang: 'en' | 'ar'): void {
    this.currentLangSubject.next(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }

  toggleLanguage(): void {
    const current = this.currentLangSubject.value;
    this.setLanguage(current === 'en' ? 'ar' : 'en');
  }

  translate(key: string): string {
    const lang = this.currentLangSubject.value;
    return this.translations[lang][key] || key;
  }

  getCurrentLang(): string {
    return this.currentLangSubject.value;
  }
}