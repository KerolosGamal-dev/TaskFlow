import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/services/theme.service';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit, OnDestroy {
  isDark = false;
  currentLang = 'en';
  searchQuery = '';
  isSearchFocused = false;
  isMobileMenuOpen = false;
  isNotificationsOpen = false;
  isProfileOpen = false;
  notifications = [
    { id: 1, text: 'Task "Angular Project" is due in 1 hour', time: '1h ago', unread: true },
    { id: 2, text: 'New group "Mathematics" created', time: '2h ago', unread: true },
    { id: 3, text: 'Task "Gym Workout" completed', time: '5h ago', unread: false }
  ];

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.themeService.isDark$.subscribe(dark => this.isDark = dark);
    this.languageService.currentLang$.subscribe(lang => this.currentLang = lang);
  }

  ngOnDestroy(): void {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-wrapper') && !target.closest('.mobile-menu-btn')) {
      this.closeAllMenus();
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isNotificationsOpen = false;
      this.isProfileOpen = false;
    }
  }

  toggleNotifications(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    if (this.isNotificationsOpen) {
      this.isMobileMenuOpen = false;
      this.isProfileOpen = false;
    }
  }

  toggleProfile(): void {
    this.isProfileOpen = !this.isProfileOpen;
    if (this.isProfileOpen) {
      this.isMobileMenuOpen = false;
      this.isNotificationsOpen = false;
    }
  }

  closeAllMenus(): void {
    this.isMobileMenuOpen = false;
    this.isNotificationsOpen = false;
    this.isProfileOpen = false;
  }

  onSearchFocus(): void {
    this.isSearchFocused = true;
  }

  onSearchBlur(): void {
    if (!this.searchQuery) {
      this.isSearchFocused = false;
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
    }
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => n.unread).length;
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }
}