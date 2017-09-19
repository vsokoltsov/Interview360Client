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
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() onMenuClicked: EventEmitter<any> = new EventEmitter();
  user: User;
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.store.select('auth').subscribe(
      data => {
        if (data.currentUser) {
          this.user = data.currentUser;
        }
        else {
          this.user = null;
        }
      }
    );
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggleMenu() {
    this.onMenuClicked.emit();
  }

}
