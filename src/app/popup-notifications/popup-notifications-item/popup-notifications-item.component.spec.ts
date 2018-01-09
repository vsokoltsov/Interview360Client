import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxSvgIconModule } from 'ngx-svg-icon';

import { PopupNotification } from '../popup-notification.model';
import { PopupNotificationsItemComponent } from './popup-notifications-item.component';
import * as fromApp from '../../store/app.reducers';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../shared/api.service';
import { PopupNotificationsService } from '../popup-notifications.service';

const popupNotification = new PopupNotification('id-1', 'a', 'b', 'c');

describe('PopupNotificationsItemComponent', () => {
  let component: PopupNotificationsItemComponent;
  let fixture: ComponentFixture<PopupNotificationsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PopupNotificationsItemComponent
      ],
      imports: [
        NgxSvgIconModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        StoreModule.forRoot(fromApp.reducers),
        FileUploadModule,
        ReactiveFormsModule,
      ],
      providers: [
        ApiService,
        CookieService,
        AuthService,
        PopupNotificationsService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNotificationsItemComponent);
    component = fixture.componentInstance;
    component.popupNotification = popupNotification;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
