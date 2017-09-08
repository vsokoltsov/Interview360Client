import { InterviewManagerPage } from './app.po';

describe('interview-manager App', () => {
  let page: InterviewManagerPage;

  beforeEach(() => {
    page = new InterviewManagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
