import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';
import { User } from '../user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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

  onLogout() {
    this.loginService.logout();
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}