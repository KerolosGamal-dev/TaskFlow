import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  language: 'en' | 'ar' = 'en';

  toggleTheme(): void {
    const html = document.documentElement;
    html.setAttribute('data-theme',
      html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }

  toggleLanguage(): void {
    this.language = this.language === 'en' ? 'ar' : 'en';
    document.documentElement.lang = this.language;
    document.documentElement.dir = this.language === 'ar' ? 'rtl' : 'ltr';
  }
}