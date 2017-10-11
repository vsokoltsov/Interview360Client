import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComponent } from './detail.component';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';

import { Company } from '../company.model';
import { User } from '../../auth/user.model';

import * as fromApp from '../../store/app.reducers';
import * as CompanyActions from '../store/companies.actions';

import { CompaniesService } from '../companies.service';
import { ApiService } from '../../shared/api.service';
import { CookieService } from 'angular2-cookie/core';
// import { UploaderModule } from '../shared/uploader/uploader.module';
//
// import { PipeModule } from '../shared/pipe.module';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailComponent
      ],
      imports: [
        NgxSvgIconModule,
        RouterTestingModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule
      ],
      providers: [
        CompaniesService,
        ApiService,
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
