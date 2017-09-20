import {
   CanActivate,
   ActivatedRouteSnapshot,
   RouterStateSnapshot,
   Router
 } from '@angular/router';
 import { Store } from '@ngrx/store';
 import { Injectable } from '@angular/core';
 import { CookieService } from 'angular2-cookie/core';
 import { TOKEN_NAME } from '../shared/api.service';

 import * as fromApp from '../store/app.reducers';
 import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .take(1)
      .map((authState: fromAuth.State) => {
        if (!authState.currentUser && !this.cookieService.get(TOKEN_NAME)) {
            this.router.navigate(['/auth', 'sign-in']);
            return false;
        } else {
          return true;
        }
      });
  }
}
