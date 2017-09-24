import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DebugElement }    from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { User } from '../user.model';
import { reducers } from '../../store/app.reducers';
import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { ApiService } from '../../shared/api.service';
import { AppRoutingModule, appRoutes } from '../../app-routing.module';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let store: Store<fromApp.AppState>;
  let de: DebugElement;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResetPasswordComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{
          path: 'reset-password',
          component: ResetPasswordComponent
        }])
      ],
      providers: [
        AuthService,
        ApiService,
        CookieService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    authService = TestBed.get(AuthService);
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set errors to the component resetPasswordErrors variable', () => {
    const failedData = { errors: { password: ['Can\'t be blank'] } };
    const action = new AuthActions.FailedResetPassword(failedData);
    store.dispatch(action);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.resetPasswordErrors).toEqual(failedData);
    });
  });

  it('should show erros under the password field', () => {
    const failedData = { errors: {password: ['Can\'t be blank'] } };
    const action = new AuthActions.FailedResetPassword(failedData.errors);
    store.dispatch(action);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const errorEmail = de.query(By.css('.form .error')).nativeElement;
      expect(errorEmail.textContent).toContain(failedData.errors.password[0]);
    });
  });

  it('call resetPassword action in authService', () => {
    spyOn(authService, 'resetPassword').and.callThrough();

    component.resetPassword();
    expect(authService.resetPassword).toHaveBeenCalled();
  });
});
