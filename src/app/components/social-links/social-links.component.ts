import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics.service';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [],
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.scss',
})
export class SocialLinksComponent {
  constructor(private analytics: AnalyticsService) {}

  onGitHubClick() {
    this.analytics.trackExternalLink(
      'https://github.com/DamianLaczynski',
      'GitHub Social'
    );
  }

  onLinkedInClick() {
    this.analytics.trackExternalLink(
      'https://linkedin.com/in/damianlaczynski',
      'LinkedIn Social'
    );
  }

  onEmailClick() {
    this.analytics.trackContact('email_social');
  }
}
