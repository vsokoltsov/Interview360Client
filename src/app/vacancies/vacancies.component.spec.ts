import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { VacanciesComponent } from './vacancies.component';
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
        VacanciesComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        RouterTestingModule
      ],
      providers: [
        ApiService,
        AuthService,
        CookieService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
