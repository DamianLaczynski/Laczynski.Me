import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
})
export class CookieConsentComponent implements OnInit {
  showBanner = false;
  showDetails = false;

  ngOnInit() {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a delay for better UX
      setTimeout(() => {
        this.showBanner = true;
      }, 2000);
    }
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  acceptAll() {
    this.setConsent({ analytics: true, essential: true });
    this.hideBanner();
  }

  acceptNecessaryOnly() {
    this.setConsent({ analytics: false, essential: true });
    this.hideBanner();
  }

  private setConsent(preferences: { analytics: boolean; essential: boolean }) {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));

    // Initialize or update Google Analytics based on consent
    if (preferences.analytics) {
      this.initializeAnalytics();
    }
  }

  private hideBanner() {
    this.showBanner = false;
  }

  private initializeAnalytics() {
    // Initialize Google Analytics if consent is given
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  }

  // Sprawdź czy użytkownik wyraził zgodę na analytics
  static hasAnalyticsConsent(): boolean {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    try {
      const parsed = JSON.parse(consent);
      return parsed.analytics === true;
    } catch {
      return false;
    }
  }
}

declare let gtag: Function;
