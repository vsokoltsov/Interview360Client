import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { User } from '../user.model';
import { authReducer, initialState } from './auth.reducers';
import * as AuthActions from './auth.actions';
import * as ProfileActions from '../../profile/store/profile.actions';
import * as fromApp from '../../store/app.reducers';

const user = new User(1);

describe('AuthReducer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
      ]
    });
  });

  it('runs CURRENT_USER_RECEIVED action', () => {
    expect(
      authReducer(initialState, {
        type: AuthActions.CURRENT_USER_RECEIVED, payload: user
      })
    ).toEqual({ ...initialState, currentUser: user })
  });

  it('runs FAILED_SIGN_IN action', () => {
    const errors = { email: ['Can\'t be blank'] };

    expect(
      authReducer(initialState, {
        type: AuthActions.FAILED_SIGN_IN, payload: errors
      })
    ).toEqual({ ...initialState, signInErrors: errors })
  });

  it('runs FAILED_SIGN_UP action', () => {
    const errors = { email: ['Can\'t be blank'] };

    expect(
      authReducer(initialState, {
        type: AuthActions.FAILED_SIGN_UP, payload: errors
      })
    ).toEqual({ ...initialState, signUpErrors: errors })
  });

  it('runs SIGN_OUT action', () => {
    expect(
      authReducer(initialState, {
        type: AuthActions.SIGN_OUT
      })
    ).toEqual({ ...initialState, currentUser: null })
  });

  it('runs FAILED_RESTORE_PASSWORD action', () => {
    const errors = { email: ['Can\'t be blank'] };

    expect(
      authReducer(initialState, {
        type: AuthActions.FAILED_RESTORE_PASSWORD, payload: errors
      })
    ).toEqual({ ...initialState, restorePasswordErrors: errors })
  });

  it('runs FAILED_RESET_PASSWORD action', () => {
    const errors = { email: ['Can\'t be blank'] };

    expect(
      authReducer(initialState, {
        type: AuthActions.FAILED_RESET_PASSWORD, payload: errors
      })
    ).toEqual({ ...initialState, resetPasswordErrors: errors })
  });

  it('runs SUCCESS_PROFILE_UPDATE action', () => {
    expect(
      authReducer(initialState, {
        type: ProfileActions.SUCCESS_PROFILE_UPDATE, payload: user
      })
    ).toEqual({ ...initialState, currentUser: user })
  });

  it('runs SUCCESS_INVITE_SUBMIT action', () => {
    initialState['inviteErrors'] = {};

    expect(
      authReducer(initialState, {
        type: AuthActions.SUCCESS_INVITE_SUBMIT
      })
    ).toEqual({ ...initialState, inviteErrors: null, successSubmitInvite: true })
  });

  it('runs FAILED_INVITE_SUBMIT action', () => {
    expect(
      authReducer(initialState, {
        type: AuthActions.FAILED_INVITE_SUBMIT, payload: {}
      })
    ).toEqual({ ...initialState, inviteErrors: {}, successSubmitInvite: false })
  });

  it('runs DISABLE_SUCCESS_INVITE action', () => {
    initialState['successSubmitInvite'] = true;

    expect(
      authReducer(initialState, {
        type: AuthActions.DISABLE_SUCCESS_INVITE
      })
    ).toEqual({ ...initialState, successSubmitInvite: false })
  });
});
