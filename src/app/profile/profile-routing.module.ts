import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './edit/info/info.component';

const profileRoutes: Routes = [
  { path: ':id', component: ProfileComponent},
  { path: ':id/edit', component: EditComponent, children: [
    { path: '', component: InfoComponent }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
