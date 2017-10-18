import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';

import { VacanciesComponent } from './vacancies.component';
import { VacanciesListItemComponent } from './vacancies-list-item/vacancies-list-item.component';
import { VacanciesService } from './vacancies.service';
import { ApiService } from '../shared/api.service';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';

describe('VacanciesComponent', () => {
  let component: VacanciesComponent;
  let fixture: ComponentFixture<VacanciesComponent>;

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
        VacanciesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
