import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

import { VacanciesTabComponent } from './vacancies-tab.component';
import { PipeModule } from '../../../shared/pipe.module';
import { CompaniesService } from '../../companies.service';
import { ApiService } from '../../../shared/api.service';

describe('VacanciesTabComponent', () => {
  let component: VacanciesTabComponent;
  let fixture: ComponentFixture<VacanciesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacanciesTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacanciesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
