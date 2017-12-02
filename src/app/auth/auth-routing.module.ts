import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { InviteComponent } from './invite/invite.component';

export const authRoutes = [
  { path: 'auth', component: AuthComponent, children: [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'restore-password', component: RestorePasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'invite', component: InviteComponent }
  ] },

];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
