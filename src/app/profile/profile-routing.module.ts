import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './edit/info/info.component';
import { PasswordComponent } from './edit/password/password.component';

const profileRoutes: Routes = [
  { path: ':id', component: ProfileComponent},
  { path: ':id/edit', component: EditComponent, children: [
    { path: '', redirectTo: 'info', pathMatch: 'full' },
    { path: 'info', component: InfoComponent },
    { path: 'change-password', component: PasswordComponent }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
