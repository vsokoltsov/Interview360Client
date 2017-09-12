import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output
} from '@angular/core';
import { User } from '../auth/user.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() onMenuClicked: EventEmitter<any> = new EventEmitter();
  user: User;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth').subscribe(
      data => {
        if (data.currentUser) {
          this.user = data.currentUser;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleMenu() {
    this.onMenuClicked.emit();
  }

}
