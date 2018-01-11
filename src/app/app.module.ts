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
import { NgDatepickerModule } from 'ng2-datepicker';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RootComponent } from './root/root.component';
import { reducers } from './store/app.reducers';
import { AuthService } from './auth/auth.service';
import { ProfileService } from './profile/profile.service';
import { InterviewsService } from './interviews/interviews.service';
import { CompaniesService } from './companies/companies.service';
import { VacanciesService } from './vacancies/vacancies.service';
import { EmployeesService } from './employees/employees.service';
import { PopupNotificationsService } from './popup-notifications/popup-notifications.service';
import { SkillsService } from './shared/skills/skills.service';
import { ApiService } from './shared/api.service';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { UploaderModule } from './shared/uploader/uploader.module';
import { LoaderModule } from './shared/loader/loader.module';
import { PopupNotificationsModule } from './popup-notifications/popup-notifications.module';

import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CompaniesModule } from './companies/companies.module';
import { VacanciesModule } from './vacancies/vacancies.module';
import { InterviewsModule } from './interviews/interviews.module';
import { EmployeesModule } from './employees/employees.module';
import { PipeModule } from './shared/pipe.module';
import { ResumesModule } from './resumes/resumes.module';

export const MODULES = {
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    RootComponent
  ],
  imports: [
    BrowserModule,
    FileUploadModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    NgxSvgIconModule,
    NgDatepickerModule,
    AuthModule,
    ProfileModule,
    CompaniesModule,
    VacanciesModule,
    InterviewsModule,
    EmployeesModule,
    ResumesModule,
    PipeModule,
    LoaderModule,
    PopupNotificationsModule
  ],
  providers: [
    AuthService,
    ProfileService,
    CookieService,
    CompaniesService,
    VacanciesService,
    InterviewsService,
    EmployeesService,
    ApiService,
    PopupNotificationsService,
    SkillsService,
    {provide: APP_BASE_HREF, useValue : '/' },
    AuthGuard,
    { provide: CookieOptions, useValue: {} }
  ],
  bootstrap: [AppComponent]
};

@NgModule(MODULES)
export class AppModule { }
