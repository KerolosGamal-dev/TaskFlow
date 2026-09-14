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
      footerTagline: 'Organize your time, achieve your goals',
      footerCredit: 'Developed with ❤️ by StudyHub Team',
      footerRights: '© 2026 StudyHub. All rights reserved.',
      socialFollow: 'Follow Us',
      quickLinks: 'Quick Links',
      contactUs: 'Contact Us'
    },
    ar: {
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
      footerTagline: 'نظّم وقتك، حقق أهدافك',
      footerCredit: 'تم التطوير بـ ❤️ بواسطة فريق StudyHub',
      footerRights: '© 2026 StudyHub. جميع الحقوق محفوظة.',
      socialFollow: 'تابعنا',
      quickLinks: 'روابط سريعة',
      contactUs: 'تواصل معنا'
    }
  };

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