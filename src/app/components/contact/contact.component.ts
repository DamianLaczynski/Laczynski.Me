import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  constructor(private analytics: AnalyticsService) {}

  onEmailClick() {
    this.analytics.trackContact('email');
  }

  onGitHubClick() {
    this.analytics.trackExternalLink(
      'https://github.com/DamianLaczynski',
      'GitHub'
    );
  }

  onLinkedInClick() {
    this.analytics.trackExternalLink(
      'https://linkedin.com/in/damianlaczynski',
      'LinkedIn'
    );
  }
}
