import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../core/auth/login/login.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private userSub?: Subscription;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.userSub = this.loginService.currentUser.subscribe(
      (user: User | null) => {
        this.isLoggedIn = !!user;
      }
    );

    this.loginService.autoLogin();
  }

  onLogout(): void {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
