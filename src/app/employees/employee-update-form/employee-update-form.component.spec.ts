import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { CookieService } from 'angular2-cookie/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule } from '@angular/forms';
import 'rxjs';
import 'rxjs/add/observable/of';

import { User } from '../../auth/user.model';
import { UploaderModule } from '../../shared/uploader/uploader.module';
import { Company } from '../../companies/company.model';
import * as fromApp from '../../store/app.reducers';
import { EmployeeUpdateFormComponent } from './employee-update-form.component';
import { EmployeesService } from '../employees.service';
import { ApiService } from '../../shared/api.service';

const user = new User(1, 'a', 'b');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');

describe('EmployeeUpdateFormComponent', () => {
  let component: EmployeeUpdateFormComponent;
  let fixture: ComponentFixture<EmployeeUpdateFormComponent>;
  let store: Store<fromApp.AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeeUpdateFormComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FileUploadModule,
        UploaderModule
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
    fixture = TestBed.createComponent(EmployeeUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
