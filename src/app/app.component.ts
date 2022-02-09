import {Component, OnInit} from '@angular/core';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'trainee-heroes-app';
  error: string | null = null;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.setRegisteredUsers();
    this.loginService.setUsers();
    this.loginService.error.subscribe(message => {
      this.error = message;
    })
  }

  onErrorClose() {
    this.error = null;
  }
}
