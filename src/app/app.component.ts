import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { InnovationComponent } from './components/innovation/innovation.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { HeroComponent } from './components/hero/hero.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { GitHubProjectsComponent } from './components/github-projects/github-projects.component';
import { AnalyticsService } from './shared/analytics.service';

@Component({
  selector: 'app-root',
  imports: [
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
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'Laczynski.Me';
  private intersectionObserver?: IntersectionObserver;

  constructor(private analytics: AnalyticsService) {}

  ngOnInit() {
    // Track initial page load
    this.analytics.trackPage('Portfolio - Damian Łaczyński', '/');

    // Initialize scroll animations after view is loaded
  }

  ngAfterViewInit() {
    this.initScrollAnimations();
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private initScrollAnimations() {
    // Create intersection observer for scroll animations
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger animation 100px before element comes into view
        threshold: 0.1,
      }
    );

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((element) => {
      this.intersectionObserver?.observe(element);
    });

    // Add staggered animations to navigation links
    this.addStaggeredAnimations();

    // Add page load animations
    this.triggerPageLoadAnimations();
  }

  private addStaggeredAnimations() {
    // Add staggered fade-in animations to navigation links
    const navLinks = document.querySelectorAll('.NavLink');
    navLinks.forEach((link, index) => {
      link.classList.add('animate-fade-in-down');
      (link as HTMLElement).style.animationDelay = `${(index + 1) * 0.1}s`;
    });
  }

  private triggerPageLoadAnimations() {
    // Trigger animations that should happen immediately on page load
    setTimeout(() => {
      const heroElements = document.querySelectorAll(
        '.HeroSection [class*="animate-"]'
      );
      heroElements.forEach((element) => {
        element.classList.add('animate-visible');
      });

      const socialLinks = document.querySelectorAll(
        '.SocialLinks [class*="animate-"]'
      );
      socialLinks.forEach((element) => {
        element.classList.add('animate-visible');
      });

      const navElement = document.querySelector('.Navigation');
      if (navElement) {
        navElement.classList.add('animate-visible');
      }

      const footerElement = document.querySelector('.FooterSection');
      if (footerElement) {
        footerElement.classList.add('animate-visible');
      }
    }, 100);
  }
}
