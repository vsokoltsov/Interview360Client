import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

import { CompanyListItemComponent } from './item.component';
import { PipeModule } from '../../shared/pipe.module';
import { Company } from '../company.model';
import { CompaniesService } from '../companies.service';
import { ApiService } from '../../shared/api.service';

const company = new Company(1, 'a', 'b', '2017-08-19', 'a');

describe('CompanyListItemComponent', () => {
  let component: CompanyListItemComponent;
  let fixture: ComponentFixture<CompanyListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompanyListItemComponent
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
        CompaniesService
      ]
    });
    fixture = TestBed.createComponent(CompanyListItemComponent);
    component = fixture.componentInstance;
    component.company = company;
    fixture.detectChanges();
  }));

  it('should create', () => {
    console.log(company);
    expect(component).toBeTruthy();
  });
});
