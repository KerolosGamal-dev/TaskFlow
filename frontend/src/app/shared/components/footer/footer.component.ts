import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  currentLang = 'en';

  constructor(private languageService: LanguageService) {
    this.languageService.currentLang$.subscribe(lang => this.currentLang = lang);
  }

  translate(key: string): string {
    return this.languageService.translate(key);
  }

  socialLinks = [
    { name: 'Facebook', icon: 'bi-facebook', url: '#' },
    { name: 'Twitter', icon: 'bi-twitter-x', url: '#' },
    { name: 'Instagram', icon: 'bi-instagram', url: '#' },
    { name: 'LinkedIn', icon: 'bi-linkedin', url: '#' },
    { name: 'GitHub', icon: 'bi-github', url: '#' }
  ];

  quickLinks = [
    { label: 'dashboard', route: '/dashboard' },
    { label: 'todolist', route: '/todolist' },
    { label: 'addTask', route: '/add-task' }
  ];
}