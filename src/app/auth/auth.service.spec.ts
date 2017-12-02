import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';

import { AuthService } from './auth.service';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';
import { ApiService } from '../shared/api.service';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Company } from '../companies/company.model';

const responseData = {current_user: {
  id: 1,
  email: 'example@mail.com',
  first_name: 'a',
  last_name: 'b'
}};
const user = new User(1, 'example@mail.com', 'a', 'b');
const company = new Company(1);

describe('Service: AuthService', () => {
  let store: Store<fromApp.AppState>;
  let authService: AuthService;
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        ApiService,
        CookieService
      ]
    });

    store = TestBed.get(Store);
    authService = TestBed.get(AuthService);
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('signIn: post() method have been called', () => {
    spyOn(apiService, 'post').and.callThrough();

    authService.signIn({ email: 'aaa@mail.ru', password: '111' });
    let result = httpMock.expectOne(`${environment.baseUrl}/sign_in/`);
    result.flush(responseData);
    httpMock.verify();
    expect(apiService.post).toHaveBeenCalled();
  });

  it('signIn: success result has been received', () => {
    store.select('auth').subscribe(
      data => {
        if (data.currentUser) {
          expect(data.currentUser.id).toEqual(responseData.current_user.id);
        }
    });

    authService.signIn({ email: 'aaa@mail.ru', password: '111' });
    let result = httpMock.expectOne(`${environment.baseUrl}/sign_in/`);
    result.flush({ token: '123' });
    let currentUserRequest = httpMock.expectOne(`${environment.baseUrl}/current_user/`);
    currentUserRequest.flush(responseData);
    httpMock.verify();
  });

  it('signIn: failed result has been received', () => {
    store.select('auth').subscribe(
      (data: any) => {
        if (data.signInErrors) {
          expect(data.signInErrors.email).toEqual('Can\'t be blank');
        }
    });

    authService.signIn({ email: 'aaa@mail.ru', password: '111' });
    let result = httpMock.expectOne(`${environment.baseUrl}/sign_in/`);
    result.flush({errors: { email: 'Can\'t be blank' }}, {statusText: 'BAD_REQUEST', status: 401});
    httpMock.verify();
  });

  it('signUp: post() method have been called', () => {
    spyOn(apiService, 'post').and.callThrough();

    authService.signUp({ email: 'aaa@mail.ru', password: '111' });
    let result = httpMock.expectOne(`${environment.baseUrl}/sign_up/`);
    result.flush(responseData);
    httpMock.verify();
    expect(apiService.post).toHaveBeenCalled();
  });

  it('signUp: success result has been received', () => {
    store.select('auth').subscribe(
      data => {
        if (data.currentUser) {
          expect(data.currentUser.id).toEqual(responseData.current_user.id);
        }
    });

    authService.signUp({ email: 'aaa@mail.ru', password: '111' });
    let result = httpMock.expectOne(`${environment.baseUrl}/sign_up/`);
    result.flush({ token: '123' });
    let currentUserRequest = httpMock.expectOne(`${environment.baseUrl}/current_user/`);
    currentUserRequest.flush(responseData);
    httpMock.verify();
  });

  it('signIn: failed result has been received', () => {
    store.select('auth').subscribe(
      (data: any) => {
        if (data.signUpErrors) {
          expect(data.signUpErrors.email).toEqual('Can\'t be blank');
        }
    });

    authService.signUp({ email: 'aaa@mail.ru', password: '111' });
    let result = httpMock.expectOne(`${environment.baseUrl}/sign_up/`);
    result.flush({errors: { email: 'Can\'t be blank' }}, {statusText: 'BAD_REQUEST', status: 401});
    httpMock.verify();
  });

  it('restorePassword: failed result has been received', () => {
    store.select('auth').subscribe(
      (data: any) => {
        if (data.restorePasswordErrors) {
          expect(data.restorePasswordErrors.email).toEqual('Can\'t be blank');
        }
    });

    authService.restorePassword({ email: 'aaa@mail.ru' });
    let result = httpMock.expectOne(`${environment.baseUrl}/restore_password/`);
    result.flush({errors: { email: 'Can\'t be blank' }}, {statusText: 'BAD_REQUEST', status: 401});
    httpMock.verify();
  });

  it('resetPassword: failed result has been received', () => {
    store.select('auth').subscribe(
      (data: any) => {
        if (data.resetPasswordErrors) {
          expect(data.resetPasswordErrors.email).toEqual('Can\'t be blank');
        }
    });

    authService.resetPassword({ password: '123', password_confirmation: '123' });
    let result = httpMock.expectOne(`${environment.baseUrl}/reset_password/`);
    result.flush({errors: { email: 'Can\'t be blank' }}, {statusText: 'BAD_REQUEST', status: 401});
    httpMock.verify();
  });

  it('inviteSubmit(): failed response', () => {
    const errors = { email: ['AAa'] };

    store.select('auth').subscribe(
      (data: any) => {
        if (data.inviteErrors) {
          expect(data.inviteErrors).toEqual(errors);
        }
    });
    authService.inviteSubmit(1, { password: '123', password_confirmation: '123' });
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/${company.id}/activate_member/`);
    result.flush({errors: errors}, {statusText: 'BAD_REQUEST', status: 401});
    httpMock.verify();
  });
});
