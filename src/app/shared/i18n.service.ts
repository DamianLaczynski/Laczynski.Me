import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, tap } from 'rxjs';

export type Language = 'en' | 'pl';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private translations: { [key: string]: any } = {};
  private currentLanguage = signal<Language>('en');

  constructor(private http: HttpClient) {
    // Initialize with stored language or default to English
    const storedLang = localStorage.getItem('preferred-language') as Language;
    if (storedLang && ['en', 'pl'].includes(storedLang)) {
      this.currentLanguage.set(storedLang);
    }

    // Load initial translations
    this.loadTranslations(this.currentLanguage()).subscribe();
  }

  get language() {
    return this.currentLanguage;
  }

  setLanguage(language: Language): Observable<boolean> {
    return this.loadTranslations(language).pipe(
      tap((success) => {
        if (success) {
          this.currentLanguage.set(language);
          localStorage.setItem('preferred-language', language);
        }
      })
    );
  }

  translate(key: string, params?: { [key: string]: string }): string {
    if (!this.translations || Object.keys(this.translations).length === 0) {
      return key; // Return key if translations not loaded yet
    }

    const keys = key.split('.');
    let value = this.translations;

    // Navigate through nested keys
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    let result = typeof value === 'string' ? value : key;

    // Replace parameters if provided
    if (params) {
      Object.keys(params).forEach((param) => {
        result = result.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
      });
    }

    return result;
  }

  private loadTranslations(language: Language): Observable<boolean> {
    return this.http.get(`/i18n/${language}.json`).pipe(
      map((translations) => {
        this.translations = translations;
        return true;
      }),
      catchError((error) => {
        console.error(`Failed to load translations for ${language}:`, error);
        return of(false);
      })
    );
  }
}
