import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
})
export class CookieConsentComponent implements OnInit {
  showBanner = false;
  showDetails = false;

  ngOnInit() {
    // Sprawdź czy użytkownik już wyraził zgodę
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      this.showBanner = true;
    }
  }

  acceptAll() {
    this.setConsent(true, true);
    this.hideBanner();
    this.loadAnalytics();
  }

  acceptNecessaryOnly() {
    this.setConsent(true, false);
    this.hideBanner();
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  private setConsent(necessary: boolean, analytics: boolean) {
    const consent = {
      necessary,
      analytics,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
  }

  private hideBanner() {
    this.showBanner = false;
  }

  private loadAnalytics() {
    // Załaduj Google Analytics i GTM
    this.loadGoogleAnalytics();
    this.loadGoogleTagManager();
  }

  private loadGoogleAnalytics() {
    // Załaduj Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-LRDENHDNV3';
    document.head.appendChild(script1);

    // Inicjalizuj Google Analytics
    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-LRDENHDNV3');
    `;
    document.head.appendChild(script2);
  }

  private loadGoogleTagManager() {
    // Załaduj Google Tag Manager
    const script = document.createElement('script');
    script.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PHZXLFGL');
    `;
    document.head.appendChild(script);

    // Dodaj noscript iframe
    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PHZXLFGL" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
    document.body.appendChild(noscript);
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
