import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupNotificationsComponent } from './popup-notifications.component';
import { PopupNotificationsItemComponent } from './popup-notifications-item/popup-notifications-item.component';


@NgModule({
  declarations: [
    PopupNotificationsComponent,
    PopupNotificationsItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PopupNotificationsComponent,
    PopupNotificationsItemComponent,
    CommonModule
  ]
})
export class PopupNotificationsModule{}
