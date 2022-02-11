import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { HeroStoreService } from './hero-store.service';
import { BattleService } from './battle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'trainee-heroes-app';
  error: string | null = null;
  errorSub?: Subscription;

  constructor(
    private loginService: LoginService,
    private heroStoreService: HeroStoreService,
    private battleService: BattleService
  ) {}

  ngOnInit() {
    this.loginService.setRegisteredUsers();
    this.loginService.setUsers();
    this.heroStoreService.setSelectedHeroes();
    this.battleService.setBattles();

    this.errorSub = this.loginService.error.subscribe((message) => {
      this.error = message;
    });
  }

  onErrorClose() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }
  }
}
