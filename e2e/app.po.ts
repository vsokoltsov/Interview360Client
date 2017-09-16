import { browser, by, element } from 'protractor';

export class InterviewManagerPage {
  navigateTo() {
    return browser.get('/');
  }

  getNavigationItems() {
    return element.all(by.tagName('app-side-nav md-list-item h4'));
  }
}
