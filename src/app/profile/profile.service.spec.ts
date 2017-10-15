import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';

import { User } from '../auth/user.model';
import { environment } from '../../environments/environment';
import { ProfileService } from './profile.service';
import { ApiService } from '../shared/api.service';
import * as fromApp from '../store/app.reducers';
import * as ProfileActions from './store/profile.actions';

const user = new User(1, 'a');
const response = {
  id: 1,
  email: 'b'
};


describe('ProfileService', () => {
  let httpMock: HttpTestingController;
  let store: Store<fromApp.AppState>;
  let profileService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ProfileService,
        ApiService,
        CookieService
      ]
    });

    store = TestBed.get(Store);
    profileService = TestBed.get(ProfileService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('receiveProfile(): get user information', () => {
    store.select('profile').subscribe(
      data => {
        if (data.profile) {
          expect(data.profile.id).toEqual(response.id);
        }
    });

    profileService.receiveProfile(user.id);
    let result = httpMock.expectOne(`${environment.baseUrl}/users/${user.id}/`);
    result.flush(response);
    httpMock.verify();
  });

  it('updateProfile(): success response', () => {
    store.select('profile').subscribe(
      data => {
        if (data.profile) {
          expect(data.profile.email).toEqual(response.email);
        }
    });

    profileService.updateProfile(user.id, response);
    let result = httpMock.expectOne(`${environment.baseUrl}/users/${user.id}/`);
    result.flush(response);
    httpMock.verify();
  });

  it('updateProfile(): failed response', () => {
    const errors = { email: ['Can\'t be blank'] };

    store.select('profile').subscribe(
      data => {
        if (data.profileErrors) {
          expect(data.profileErrors).toEqual(errors);
        }
    });

    profileService.updateProfile(user.id, response);
    let result = httpMock.expectOne(`${environment.baseUrl}/users/${user.id}/`);
    result.flush(errors, { status: 400, statusText: 'BAD_REQUEST' });
    httpMock.verify();
  });

  it('changePassword(): failed response', () => {
    const errors = { email: ['Can\'t be blank'] };

    store.select('profile').subscribe(
      data => {
        if (data.passwordChangeErrors) {
          expect(data.passwordChangeErrors).toEqual(errors);
        }
    });

    profileService.changePassword(user.id, response);
    let result = httpMock.expectOne(`${environment.baseUrl}/users/${user.id}/change_password/`);
    result.flush(errors, { status: 400, statusText: 'BAD_REQUEST' });
    httpMock.verify();
  });
});
