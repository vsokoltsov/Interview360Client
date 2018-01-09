import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNotificationsItemComponent } from './popup-notifications-item.component';

describe('PopupNotificationsItemComponent', () => {
  let component: PopupNotificationsItemComponent;
  let fixture: ComponentFixture<PopupNotificationsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNotificationsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNotificationsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
