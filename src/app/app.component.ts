import {Component, OnInit} from '@angular/core';
import { LoginService } from './login/login.service';
import {HeroStoreService} from "./hero-store.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'trainee-heroes-app';
  error: string | null = null;

  constructor(private loginService: LoginService,
              private heroStoreService: HeroStoreService) {}

  ngOnInit() {
    this.loginService.setRegisteredUsers();
    this.loginService.setUsers();
    this.heroStoreService.setSelectedHeroes();
    this.loginService.error.subscribe(message => {
      this.error = message;
    })
  }

  onErrorClose() {
    this.error = null;
  }
}
