import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieService } from 'angular2-cookie/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Vacancy } from '../../../vacancies/vacancy.model';
import { Company } from '../../company.model';
import { AuthService } from '../../../auth/auth.service';
import * as CompanyActions from '../../store/companies.actions';
import { VacanciesListItemComponent } from '../../../vacancies/vacancies-list-item/vacancies-list-item.component';
import { VacanciesTabComponent } from './vacancies-tab.component';
import { PipeModule } from '../../../shared/pipe.module';
import { CompaniesService } from '../../companies.service';
import { ApiService } from '../../../shared/api.service';
import * as fromApp from '../../../store/app.reducers';

const vacancy = new Vacancy();
const company = new Company(1);

describe('VacanciesTabComponent', () => {
  let component: VacanciesTabComponent;
  let fixture: ComponentFixture<VacanciesTabComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VacanciesTabComponent,
        VacanciesListItemComponent
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        CompaniesService,
        CookieService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacanciesTabComponent);
    store = TestBed.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store.dispatch(new CompanyActions.CompanyLoaded(company));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
