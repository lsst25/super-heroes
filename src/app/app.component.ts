import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit, ViewChild,
} from '@angular/core';
import { LoginService } from './core/auth/login/login.service';
import { HeroStoreService } from './shared/hero-store.service';
import { BattleService } from './main/battle/battle.service';
import { Subscription } from 'rxjs';
import { User } from './models/user.model';
import { StateStoreService } from './state-store.service';
import {LoadChildDirective} from "./load-child.directive";
import {AlertComponent} from "./shared/alert/alert.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(LoadChildDirective, {static: true}) dynamicChild!: LoadChildDirective;
  user: User | null = null;
  errorSub?: Subscription;
  userSub?: Subscription;

  constructor(
    private loginService: LoginService,
    private heroStoreService: HeroStoreService,
    private battleService: BattleService,
    private state: StateStoreService
  ) {}

  ngOnInit(): void {
    this.loginService.setUsers();

    this.errorSub = this.loginService.error.subscribe((message: string) => {
      this.loadDynamicAlert(message);
    });

    this.userSub = this.loginService.currentUser.subscribe(
      (user: User | null) => {
        this.user = user;
        if (user) {
          this.state.getState(user.email + user.username);
          this.heroStoreService.setSelectedHeroes();
          this.heroStoreService.setPowerups();
          this.battleService.setBattles();
        }
      }
    );
  }

  private loadDynamicAlert(message: string) {
    const componentRef = this.dynamicChild.viewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = message;
    componentRef.instance.close.subscribe( () => {
      this.dynamicChild.viewContainerRef.clear();
    })
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
