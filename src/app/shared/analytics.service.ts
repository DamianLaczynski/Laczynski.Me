import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {}

  public trackEvent(
    eventAction: string,
    eventCategory: string,
    eventLabel?: string,
    value?: number
  ) {
    gtag('event', eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
      value: value,
    });
  }

  public trackPage(pageTitle: string, pagePath: string) {
    gtag('config', 'G-LRDENHDNV3', {
      page_title: pageTitle,
      page_path: pagePath,
    });
  }

  public trackContact(method: string) {
    this.trackEvent('contact', 'engagement', method);
  }

  public trackProjectView(projectName: string) {
    this.trackEvent('project_view', 'portfolio', projectName);
  }

  public trackDownload(fileName: string) {
    this.trackEvent('download', 'resource', fileName);
  }

  public trackExternalLink(url: string, linkName: string) {
    this.trackEvent('click', 'external_link', `${linkName} - ${url}`);
  }
}
