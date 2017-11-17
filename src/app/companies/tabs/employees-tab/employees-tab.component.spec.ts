import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
import { StoreModule, Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';

import { EmployeesTabComponent } from './employees-tab.component';
import { PipeModule } from '../../../shared/pipe.module';
import { CompaniesService } from '../../companies.service';
import { ApiService } from '../../../shared/api.service';

describe('EmployeesTabComponent', () => {
  let component: EmployeesTabComponent;
  let fixture: ComponentFixture<EmployeesTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeesTabComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        RouterTestingModule,
        HttpClientModule,
        NgxSvgIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
