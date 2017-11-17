import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'angular2-cookie/core';

import { EmployeesFormComponent } from './employees-form.component';
import { EmployeesService } from '..//employees.service';
import * as fromApp from '../../store/app.reducers';
import * as EmployeesActions from '..//store/employees.actions';
import { ApiService } from '../../shared/api.service';

describe('EmployeesFormComponent', () => {
  let component: EmployeesFormComponent;
  let fixture: ComponentFixture<EmployeesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeesFormComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        NgxSvgIconModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        EmployeesService,
        ApiService,
        CookieService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
