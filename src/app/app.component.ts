import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { HeroStoreService } from './hero-store.service';
import { BattleService } from './battle.service';
import { Subscription } from 'rxjs';
import {User} from "./user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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

  ngOnInit() {
    this.loginService.setUsers();
    this.heroStoreService.setSelectedHeroes();
    this.battleService.setBattles();

    this.errorSub = this.loginService.error.subscribe((message: string) => {
      this.error = message;
    });

    this.userSub = this.loginService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  onErrorClose() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.errorSub) {
      this.errorSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
