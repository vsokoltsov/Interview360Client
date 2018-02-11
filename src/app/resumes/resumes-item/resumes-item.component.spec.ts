import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { ResumesItemComponent } from './resumes-item.component';
import { PopupNotificationsService } from '../../popup-notifications/popup-notifications.service';
import { Resume } from '../resume.model';
import { ResumesService } from '../resumes.service';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';

const resume = new Resume(1, 'aaa');

describe('ResumesItemComponent', () => {
  let component: ResumesItemComponent;
  let fixture: ComponentFixture<ResumesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResumesItemComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        ReactiveFormsModule,
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        AuthService,
        CookieService,
        ResumesService,
        PopupNotificationsService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumesItemComponent);
    component = fixture.componentInstance;
    component.resume = resume;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
