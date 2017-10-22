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

import { environment } from '../../environments/environment';
import { Vacancy } from './vacancy.model';
import { Company } from '../companies/company.model';
import { VacanciesComponent } from './vacancies.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';
import { VacancyFormComponent } from './vacancy-form/vacancy-form.component';
import { VacanciesListItemComponent } from './vacancies-list-item/vacancies-list-item.component';
import { VacanciesService } from './vacancies.service';
import { ApiService } from '../shared/api.service';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';

const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
vacancy.company_id = company.id;
vacancy.company = company;
const response = [
  {
    id: 1,
    title: 'aaa',
    company_id: company.id,
    company: company,
    description: 'awdawd',
    start_date: '2017-08-19',
    salary: 120.00
  }
];

describe('VacanciesComponent', () => {
  let component: VacanciesComponent;
  let fixture: ComponentFixture<VacanciesComponent>;
  let httpMock: HttpTestingController;
  let store: Store<fromApp.AppState>;
  let vacanciesService: VacanciesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VacanciesComponent,
        VacanciesListItemComponent,
        VacancyDetailComponent,
        VacancyFormComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        RouterTestingModule.withRoutes([
          {
            path: `companies/${company.id}/vacancies/${vacancy.id}`,
            component: VacancyDetailComponent
          },
          {
            component: VacancyFormComponent,
            path: `companies/${company.id}/vacancies/new`,
          }
        ]),
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        AuthService,
        CookieService,
        VacanciesService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ companyId: company.id }),
            snapshot: {
              params: {
                id: vacancy.id
              },
              parent: {
                params: {
                  companyId: company.id
                }
              }
            }
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(VacanciesComponent);
    store = TestBed.get(Store);
    vacanciesService = TestBed.get(VacanciesService);
    spyOn(vacanciesService, 'loadList').and.callThrough();
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/vacancies/`);
    result.flush(response);
    httpMock.verify();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('call loadList on vacanciesService instance', () => {
    expect(vacanciesService.loadList).toHaveBeenCalled();
  });
});
