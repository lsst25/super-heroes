import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { HeroStoreService } from '../hero-store.service';

@Injectable({
  providedIn: 'root',
})
export class BattleGuardService implements CanActivate {
  constructor(
    private heroStoreService: HeroStoreService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.heroStoreService.lastSelectedHero) {
      return true;
    }

    return this.router.createUrlTree(['/select']);
  }
}
