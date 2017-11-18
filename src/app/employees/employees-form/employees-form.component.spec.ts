import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'angular2-cookie/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { Company } from '../../companies/company.model';
import { EmployeesFormComponent } from './employees-form.component';
import { EmployeesService } from '..//employees.service';
import * as fromApp from '../../store/app.reducers';
import * as EmployeesActions from '..//store/employees.actions';
import { ApiService } from '../../shared/api.service';

const company = new Company(1, 'a', 'b', '2017-08-19', 'a');

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
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        EmployeesService,
        ApiService,
        CookieService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ companyId: company.id }),
            snapshot: {
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

    fixture = TestBed.createComponent(EmployeesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
