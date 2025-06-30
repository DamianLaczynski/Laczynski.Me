import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics.service';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-github-projects',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './github-projects.component.html',
  styleUrl: './github-projects.component.scss',
})
export class GitHubProjectsComponent {
  constructor(private analytics: AnalyticsService) {}

  onGitHubProjectsClick() {
    this.analytics.trackExternalLink(
      'https://github.com/DamianLaczynski',
      'GitHub Projects'
    );
  }
}
