import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../auth/user.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
  user: User;
  avatarUrl: string;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('auth').subscribe(
      data => {
        if (data.currentUser) {
          this.user = data.currentUser;
          if (this.user.attachment) {
            this.avatarUrl = this.user.attachment.thumb_url;
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
