import { Component, OnInit } from '@angular/core';
import { PopupNotification } from '../popup-notification.model';

@Component({
  selector: 'app-popup-notifications-item',
  templateUrl: './popup-notifications-item.component.html',
  styleUrls: ['./popup-notifications-item.component.scss']
})
export class PopupNotificationsItemComponent implements OnInit {
  display: boolean = false;
  reduced: boolean = false;
  popupNotification: PopupNotification;
  killTimeout = null;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.display = true;
    }, 300);

    let result = {};

    if (this.popupNotification.type) {
      result = setTimeout(this.hide, 7300);
    }
    else {
      result = setTimeout(this.hide, 4000);
    }
  }

  hide() {
    clearTimeout(this.killTimeout);
    this.display = false;

    this.killTimeout = setTimeout(() => {
      // this.setState({ reduced: true });
      // DropNotification(this.props.id);
    }, 500);
  }

}
