import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { InterviewsComponent } from '../interviews.component';
import { InterviewListItemComponent } from '../interview-list-item/interview-list-item.component';
import { InterviewDetailComponent } from './interview-detail.component';
import { MockActivatedRoute } from '../../shared/mock-activated-route';
import { Company } from '../../companies/company.model';
import { Interview } from '../interview.model';
import { User } from '../../auth/user.model';
import { environment } from '../../../environments/environment';
import * as fromApp from '../../store/app.reducers';
import * as InterviewActions from '../store/interview.actions';

import { InterviewsService } from '../interviews.service';
import { ApiService } from '../../shared/api.service';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from '../../auth/auth.service';

// const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const interview = new Interview(1, 1, 1);
const detailResponse = {
  id: 1,
  company: {
    id: 1,
    name: 'AAA'
  },
  vacancy: {
    id: 1,
    name: 'AAA'
  },
  start_date: '2017-08-19',
  city: '1'
};
const listResponse = [{
  id: 1,
  company_id: 1,
  vacancy_id: 1,
  start_date: '2017-08-19',
  city: '1'
}];

describe('InterviewDetailComponent', () => {
  let component: InterviewDetailComponent;
  let fixture: ComponentFixture<InterviewDetailComponent>;
  let httpMock: HttpTestingController;
  let store: Store<fromApp.AppState>;
  let interviewsService: InterviewsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InterviewsComponent,
        InterviewListItemComponent,
        InterviewDetailComponent
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
        AuthService,
        CookieService,
        InterviewsService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ companyId: company.id, id: interview.id }),
            snapshot: {
              params: {
                id: interview.id
              },
              parent: {
                params: {
                  companyId: company.id
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    interviewsService = TestBed.get(InterviewsService);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(interviewsService, 'receiveInterview').and.callThrough();
    fixture.detectChanges();
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/interviews/${interview.id}/`);
    result.flush(detailResponse);
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
