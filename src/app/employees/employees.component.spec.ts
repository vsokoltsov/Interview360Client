import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { EmployeesComponent } from './employees.component';
import { EmployeesService } from './employees.service';
import { EmployeesListItemComponent } from './employees-list-item/employees-list-item.component';
import { User } from '../auth/user.model';
import { ApiService } from '../shared/api.service';
import * as fromApp from '../store/app.reducers';

const user = new User(1, 'a', 'b');

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeesComponent,
        EmployeesListItemComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        ReactiveFormsModule,
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        EmployeesService,
        ApiService,
        CookieService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
