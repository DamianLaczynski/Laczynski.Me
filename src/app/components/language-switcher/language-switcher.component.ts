import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService, Language } from '../../shared/i18n.service';

@Component({
  selector: 'app-language-switcher',
  imports: [CommonModule],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
})
export class LanguageSwitcherComponent {
  private i18n = inject(I18nService);

  get currentLanguage() {
    return this.i18n.language();
  }

  switchLanguage(language: Language) {
    if (language !== this.currentLanguage) {
      this.i18n.setLanguage(language).subscribe({
        next: (success) => {
          if (!success) {
            console.error('Failed to switch language');
          }
        },
        error: (error) => {
          console.error('Error switching language:', error);
        },
      });
    }
  }
}
