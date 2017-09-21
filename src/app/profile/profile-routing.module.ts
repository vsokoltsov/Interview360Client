import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';

const profileRoutes: Routes = [
  { path: 'users/:id', component: ProfileComponent },
  { path: 'users/:id/edit', component: EditComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(profileRoutes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
