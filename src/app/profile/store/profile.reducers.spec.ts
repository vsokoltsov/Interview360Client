import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { User } from '../../auth/user.model';
import { profileReducer, initialState } from './profile.reducers';
import * as ProfileActions from './profile.actions';
import * as fromApp from '../../store/app.reducers';

const user = new User(1);

describe('ProfileReducers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
      ]
    });
  });

  it('run RECEIVE_PROFILE action', () => {
    expect(
      profileReducer(initialState, {
        type: ProfileActions.RECEIVE_PROFILE, payload: user
      })
    ).toEqual({ ...initialState, profile: user });
  });

  it('run SUCCESS_PROFILE_UPDATE action', () => {
    expect(
      profileReducer(initialState, {
        type: ProfileActions.SUCCESS_PROFILE_UPDATE, payload: user
      })
    ).toEqual({ ...initialState, profile: user });
  });

  it('run FAILED_PROFILE_UPDATE action', () => {
    const errors = { email: ['Can\'t be blank'] };

    expect(
      profileReducer(initialState, {
        type: ProfileActions.FAILED_PROFILE_UPDATE, payload: errors
      })
    ).toEqual({ ...initialState, profileErrors: errors });
  });

  it('run FAILED_PASSWORD_CHANGE action', () => {
    const errors = { email: ['Can\'t be blank'] };

    expect(
      profileReducer(initialState, {
        type: ProfileActions.FAILED_PASSWORD_CHANGE, payload: errors
      })
    ).toEqual({ ...initialState, passwordChangeErrors: errors });
  });
});
