import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from './core/auth/login/login.service';
import {HeroStoreService} from './shared/hero-store.service';
import {BattleService} from './main/battle/battle.service';
import {Subscription} from 'rxjs';
import {User} from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'trainee-heroes-app';
  user: User | null = null;
  error: string | null = null;
  errorSub?: Subscription;
  userSub?: Subscription;

  constructor(
    private loginService: LoginService,
    private heroStoreService: HeroStoreService,
    private battleService: BattleService
  ) {}

  ngOnInit(): void {
    this.loginService.setUsers();
    this.heroStoreService.setSelectedHeroes();
    this.battleService.setBattles();

    this.errorSub = this.loginService.error.subscribe((message: string) => {
      this.error = message;
    });

    this.userSub = this.loginService.currentUser.subscribe(
      (user: User | null) => {
        this.user = user;
      }
    );
  }

  onErrorClose(): void {
    this.error = null;
  }

  ngOnDestroy(): void {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
