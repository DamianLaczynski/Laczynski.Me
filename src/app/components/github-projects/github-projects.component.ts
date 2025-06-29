import { Component } from '@angular/core';
import { AnalyticsService } from '../../shared/analytics.service';

@Component({
  selector: 'app-github-projects',
  standalone: true,
  imports: [],
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
