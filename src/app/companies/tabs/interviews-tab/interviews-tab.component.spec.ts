import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'angular2-cookie/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { InterviewsTabComponent } from './interviews-tab.component';
import { InterviewListItemComponent } from '../../../interviews/interview-list-item/interview-list-item.component';
import { PipeModule } from '../../../shared/pipe.module';
import { CompaniesService } from '../../companies.service';
import { ApiService } from '../../../shared/api.service';
import { Interview } from '../../../interviews/interview.model';
import { Company } from '../../company.model';
import * as fromApp from '../../../store/app.reducers';
import * as CompanyActions from '../../store/companies.actions';

const company = new Company(1);
const interview = new Interview(1, 1, 1);

describe('InterviewsTabComponent', () => {
  let component: InterviewsTabComponent;
  let fixture: ComponentFixture<InterviewsTabComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InterviewsTabComponent,
        InterviewListItemComponent
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule,
        NgxSvgIconModule
      ],
      providers: [
        ApiService,
        CompaniesService,
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewsTabComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store.dispatch(new CompanyActions.CompanyLoaded(company));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
