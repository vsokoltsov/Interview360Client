import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CookieService, CookieOptions } from 'angular2-cookie/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import { AuthGuard } from './auth/auth-guard.service';
import { NgxSvgIconModule } from 'ngx-svg-icon';

import {
  MdSidenavModule,
  MdToolbarModule,
  MdIconModule,
  MdListModule,
  MdCardModule,
  MdInputModule,
  MdButtonModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { RootComponent } from './root/root.component';
import { reducers } from './store/app.reducers';
import { AuthService } from './auth/auth.service';
import { ProfileService } from './profile/profile.service';
import { CompaniesService } from './companies/companies.service';
import { ApiService } from './shared/api.service';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CompaniesModule } from './companies/companies.module';

export const MODULES = {
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    VacanciesComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    MdSidenavModule,
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    AuthModule,
    ProfileModule,
    CompaniesModule
  ],
  providers: [
    AuthService,
    ProfileService,
    CookieService,
    CompaniesService,
    ApiService,
    {provide: APP_BASE_HREF, useValue : '/' },
    AuthGuard,
    { provide: CookieOptions, useValue: {} }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
};

@NgModule(MODULES)
export class AppModule { }
