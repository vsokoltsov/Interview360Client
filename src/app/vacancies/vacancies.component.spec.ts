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

import { environment } from '../../environments/environment';
import { Vacancy } from './vacancy.model';
import { Company } from '../companies/company.model';
import { VacanciesComponent } from './vacancies.component';
import { VacanciesListItemComponent } from './vacancies-list-item/vacancies-list-item.component';
import { VacanciesService } from './vacancies.service';
import { ApiService } from '../shared/api.service';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';

const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const response = { companies: [
  {
    id: 1,
    name: 'aaa',
    description: 'awdawd',
    start_date: '2017-08-19',
    city: '1'
  }
]};

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
        VacanciesListItemComponent
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
        VacanciesService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ companyId: company.id })
          }
        }
      ]
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
