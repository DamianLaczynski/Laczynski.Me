import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InnovationComponent } from './components/innovation/innovation.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { GitHubProjectsComponent } from './components/github-projects/github-projects.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    InnovationComponent,
    ExperienceComponent,
    HeroComponent,
    NavigationComponent,
    SocialLinksComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    GitHubProjectsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Laczynski.Me';
}
