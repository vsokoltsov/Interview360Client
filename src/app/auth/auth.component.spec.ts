import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { Router } from '@angular/router';

import {
  MdSidenavModule,
  MdToolbarModule,
  MdIconModule,
  MdListModule,
  MdCardModule
} from '@angular/material';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/core';
import { DebugElement }    from '@angular/core';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { User } from '../auth/user.model';
import { reducers } from '../store/app.reducers';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';
import { ApiService } from '../shared/api.service';
import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RootComponent } from '../root/root.component';
import { AppRoutingModule, appRoutes } from '../app-routing.module';
import { CompaniesComponent } from '../companies/companies.component';
import { VacanciesComponent } from '../vacancies/vacancies.component';

const user = new User(1, 'example@mail.com', 'a', 'b');

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: Store<fromApp.AppState>;
  let router: Router;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RootComponent,
        AuthComponent,
        SignInComponent,
        SignUpComponent,
        RestorePasswordComponent,
        ResetPasswordComponent,
        CompaniesComponent,
        VacanciesComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        RouterModule,
        RouterTestingModule.withRoutes([
          { path: 'companies', component: CompaniesComponent }
        ])
      ],
      providers: [
        AuthService,
        ApiService,
        CookieService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    de = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display SignIn component by default', () => {
    const signInButton = de.query(By.css('.tabs a')).nativeElement;
    expect(signInButton.textContent).toContain('Sign in');
  });

  it('should call router if current user is present', () => {
    spyOn(router, 'navigate').and.callThrough();

    const action = new AuthActions.CurrentUserReceived(user);
    store.dispatch(action);

    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalled();
  });
});
