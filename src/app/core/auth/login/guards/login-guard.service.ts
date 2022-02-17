import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    if (this.loginService.isLoggedIn) {
      if (state.url === '/login') {
        return this.router.createUrlTree(['/select']);
      }
      return true;
    }

    console.log('You shall not pass!');
    return this.router.createUrlTree(['/login']);
  }
}
