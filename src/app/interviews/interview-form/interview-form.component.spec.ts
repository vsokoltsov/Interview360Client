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
import { DpDatePickerModule } from 'ng2-date-picker';
import 'rxjs';
import 'rxjs/add/observable/of';

import { InterviewFormComponent } from './interview-form.component';
import { InterviewsComponent } from '../interviews.component';
import { InterviewListItemComponent } from '../interview-list-item/interview-list-item.component';
import { InterviewsService } from '../interviews.service';
import { VacanciesService } from '../../vacancies/vacancies.service';
import { EmployeesService } from '../../employees/employees.service';
import { Company } from '../../companies/company.model';
import { Interview } from '../interview.model';
import { Vacancy } from '../../vacancies/vacancy.model';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../shared/api.service';
import * as fromApp from '../../store/app.reducers';
import { AutocompleteModule } from '../../shared/autocomplete/autocomplete.module';

const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const interview = new Interview(1, vacancy.id, company.id)
const detailResponse = {
  id: 1,
  company: {
    id: 1
  },
  vacancy: {
    id: 1
  }
};
const listResponse = [{
  id: 1,
  company_id: company.id,
  vacancy_id: vacancy.id
}];

describe('InterviewFormComponent', () => {
  let component: InterviewFormComponent;
  let fixture: ComponentFixture<InterviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InterviewFormComponent,
        InterviewsComponent,
        InterviewListItemComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        ReactiveFormsModule,
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule,
        AutocompleteModule,
        DpDatePickerModule
      ],
      providers: [
        ApiService,
        CookieService,
        VacanciesService,
        EmployeesService,
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
    fixture = TestBed.createComponent(InterviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
