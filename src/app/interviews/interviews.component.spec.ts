import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as fromApp from '../store/app.reducers';

import { environment } from '../../environments/environment';
import { Vacancy } from '../vacancies/vacancy.model';
import { Company } from '../companies/company.model';
import { InterviewsService } from './interviews.service';
import { ApiService } from '../shared/api.service';
import { CookieService } from 'angular2-cookie/core';

import { InterviewsComponent } from './interviews.component';
import { InterviewListItemComponent } from './interview-list-item/interview-list-item.component';

describe('InterviewsComponent', () => {
  let component: InterviewsComponent;
  let fixture: ComponentFixture<InterviewsComponent>;
  let httpMock: HttpTestingController;
  let store: Store<fromApp.AppState>;
  let interviewsService: InterviewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InterviewsComponent,
        InterviewListItemComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        CookieService,
        InterviewsService
        // VacanciesService
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
