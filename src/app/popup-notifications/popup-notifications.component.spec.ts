import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNotificationsComponent } from './popup-notifications.component';

describe('PopupNotificationsComponent', () => {
  let component: PopupNotificationsComponent;
  let fixture: ComponentFixture<PopupNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
