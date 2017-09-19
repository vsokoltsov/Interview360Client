import { InterviewManagerPage } from './app.po';

describe('interview-manager App', () => {
  let page: InterviewManagerPage;

  beforeEach(() => {
    page = new InterviewManagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getNavigationItems().get(0).getText()).toEqual('Companies');
    expect(page.getNavigationItems().get(1).getText()).toEqual('Vacancies');
    expect(page.getNavigationItems().get(2).getText()).toEqual('Interviews');
  });
});
