import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

import { VacanciesListItemComponent } from './vacancies-list-item.component';
import { PipeModule } from '../../shared/pipe.module';
import { VacanciesService } from '../vacancies.service';
import { ApiService } from '../../shared/api.service';

describe('VacanciesListItemComponent', () => {
  let component: VacanciesListItemComponent;
  let fixture: ComponentFixture<VacanciesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VacanciesListItemComponent
      ],
      imports: [
        NgxSvgIconModule,
        RouterTestingModule,
        PipeModule,
        HttpClientModule
      ],
      providers: [
        CookieService,
        ApiService,
        VacanciesService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
