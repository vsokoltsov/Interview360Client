import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { VacancyDetailComponent } from './vacancy-detail.component';
import { VacanciesComponent } from '../vacancies.component';
import { Company } from '../../companies/company.model';
import { VacanciesListItemComponent } from '../vacancies-list-item/vacancies-list-item.component';
import { environment } from '../../../environments/environment';
import { Vacancy } from '../vacancy.model';
import { VacanciesService } from '../vacancies.service';
import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';

const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const detailResponse = {
  id: 1,
  name: 'aaa',
  description: 'awdawd',
  start_date: '2017-08-19',
  city: '1'
};
const listResponse = [{
  id: 1,
  name: 'aaa',
  description: 'awdawd',
  start_date: '2017-08-19',
  city: '1'
}];

describe('VacancyDetailComponent', () => {
  let component: VacancyDetailComponent;
  let fixture: ComponentFixture<VacancyDetailComponent>;
  let httpMock: HttpTestingController;
  let store: Store<fromApp.AppState>;
  let vacanciesService: VacanciesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VacanciesComponent,
        VacanciesListItemComponent,
        VacancyDetailComponent
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
        VacanciesService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ companyId: company.id, id: vacancy.id }),
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    vacanciesService = TestBed.get(VacanciesService);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(vacanciesService, 'receiveVacancy').and.callThrough();
    fixture.detectChanges();
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/vacancies/${vacancy.id}/`);
    result.flush(detailResponse);
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('called receiveVacancy on vacanciesService', () => {
    expect(vacanciesService.receiveVacancy).toHaveBeenCalled();
  });

  it('set vacancy to component\'s variable', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.vacancy.id).toEqual(detailResponse.id);
    });
  });

  it('call vacanciesService.deleteVacancy after deleteVacancy() call', () => {
    spyOn(vacanciesService, 'deleteVacancy').and.callThrough();
    component.deleteVacancy();
    expect(vacanciesService.deleteVacancy).toHaveBeenCalled();
  });
});
