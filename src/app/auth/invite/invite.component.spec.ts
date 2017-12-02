import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteComponent } from './invite.component';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/core';
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

describe('InviteComponent', () => {
  let component: InviteComponent;
  let fixture: ComponentFixture<InviteComponent>;
  let store: Store<fromApp.AppState>;
  let de: DebugElement;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InviteComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([{
          path: 'invite',
          component: InviteComponent
        }])
      ],
      providers: [
        AuthService,
        ApiService,
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    authService = TestBed.get(AuthService);
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set errors to the component resetPasswordErrors variable', () => {
    const failedData = { errors: { password: ['Can\'t be blank'] } };
    const action = new AuthActions.FailedInviteSubmit(failedData);
    store.dispatch(action);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.inviteFormErrors).toEqual(failedData);
    });
  });

  it('should show erros under the password field', () => {
    const failedData = { errors: {password: ['Can\'t be blank'] } };
    const action = new AuthActions.FailedInviteSubmit(failedData.errors);
    store.dispatch(action);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const errorEmail = de.query(By.css('.form .error')).nativeElement;
      expect(errorEmail.textContent).toContain(failedData.errors.password[0]);
    });
  });

  it('call inviteSubmit action in authService', () => {
    spyOn(authService, 'inviteSubmit').and.callThrough();

    component.submitInvite();
    expect(authService.inviteSubmit).toHaveBeenCalled();
  });
});
