import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { InviteComponent } from './invite/invite.component';


@NgModule({
  declarations: [
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    RestorePasswordComponent,
    ResetPasswordComponent,
    InviteComponent
  ],
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    BrowserModule
  ]
})
export class AuthModule {}
