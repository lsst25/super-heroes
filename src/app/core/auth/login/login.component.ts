import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  mode: 'login' | 'newAccount' = 'login';

  emailInputValue = '';

  usernamePattern = /^[a-zA-Z]+(\s|-|[A-Z])[a-zA-Z]+$/;
  emailPattern = /^\w*\.?\w*\.?\w*\.?\w*@\w{1,5}\.(com|net|org|co|us)$/;
  passwordPattern = /(?=.*\d)(?=.*\p{Lu})(?=.*\W)/u;

  constructor(private loginService: LoginService, private router: Router) {}

  onCreateNewAccount(): void {
    this.switchMode();
  }

  switchMode(): void {
    if (this.mode === 'login') {
      this.mode = 'newAccount';
      return;
    }
    this.mode = 'login';
  }

  onSubmit(form: NgForm): void {
    const { username, email, password } = form.value;
    let success = false;

    if (this.mode === 'login') {
      success = this.loginService.login(email, password);
    }

    if (this.mode === 'newAccount') {
      const newUser = new User(username, email, password);
      success = this.loginService.addUser(newUser);
    }

    form.reset();

    if (success && this.mode === 'login') {
      this.router.navigate(['select']);
      return;
    }
    if (success && this.mode === 'newAccount') {
      this.switchMode();
      return;
    }
  }
}
