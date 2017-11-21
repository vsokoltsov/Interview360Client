import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieService } from 'angular2-cookie/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { User } from '../../auth/user.model';
import { Company } from '../../companies/company.model';
import * as fromApp from '../../store/app.reducers';
import { EmployeesDetailComponent } from './employees-detail.component';
import { EmployeesService } from '../employees.service';
import { ApiService } from '../../shared/api.service';
import { ImageModule } from '../../shared/image/image.module';

const user = new User(1, 'a', 'b');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');

const detailResponse = {
  id: 1,
  name: 'aaa',
  description: 'awdawd',
  start_date: '2017-08-19',
  city: '1'
};

describe('EmployeesDetailComponent', () => {
  let component: EmployeesDetailComponent;
  let fixture: ComponentFixture<EmployeesDetailComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeesDetailComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule,
        ImageModule
      ],
      providers: [
        EmployeesService,
        ApiService,
        CookieService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ companyId: company.id, id: user.id }),
            snapshot: {
              params: {
                id: user.id
              },
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
