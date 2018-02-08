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

import { ResumesDetailComponent } from './resumes-detail.component';
import { PopupNotificationsService } from '../../popup-notifications/popup-notifications.service';
import { ResumesItemComponent } from '../resumes-item/resumes-item.component';
import { Resume } from '../resume.model';
import { ResumesService } from '../resumes.service';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import { ImageModule } from '../../shared/image/image.module';

describe('ResumesDetailComponent', () => {
  let component: ResumesDetailComponent;
  let fixture: ComponentFixture<ResumesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResumesDetailComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        ReactiveFormsModule,
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule,
        ImageModule
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
    fixture = TestBed.createComponent(ResumesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
