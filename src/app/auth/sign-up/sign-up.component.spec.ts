import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/core';
import { DebugElement }    from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { User } from '../user.model';
import { reducers } from '../../store/app.reducers';
import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
import { ApiService } from '../../shared/api.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let store: Store<fromApp.AppState>;
  let de: DebugElement;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignUpComponent,
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [
        AuthService,
        ApiService,
        CookieService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    authService = TestBed.get(AuthService);
    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set errors to the component signUpErrors variable', () => {
    const failedData = { errors: {email: ['Can\'t be blank'] } };
    const action = new AuthActions.FailedSignUp(failedData);
    store.dispatch(action);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.signUpErrors).toEqual(failedData);
    });
  });

  it('should show erros under the mail field', () => {
    const failedData = { errors: {email: ['Can\'t be blank'] } };
    const action = new AuthActions.FailedSignUp(failedData.errors);
    store.dispatch(action);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const errorEmail = de.query(By.css('.form .error')).nativeElement;
      expect(errorEmail.textContent).toContain(failedData.errors.email[0]);
    });
  });

  it('call signIn action in authService', () => {
    spyOn(authService, 'signUp').and.callThrough();

    component.signUp();
    expect(authService.signUp).toHaveBeenCalled();
  });
});
