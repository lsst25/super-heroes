import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import {
  emailPattern,
  passwordPattern,
  usernamePattern,
} from '../../../shared/constatnts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  mode: 'login' | 'newAccount' = 'login';

  authForm = this.fb.group({
    username: [
      '',
      this.mode === 'newAccount'
        ? [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(usernamePattern),
          ]
        : null,
    ],
    email: [
      '',
      [Validators.required, Validators.email, Validators.pattern(emailPattern)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern(passwordPattern),
      ],
    ],
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  onCreateNewAccount(): void {
    this.switchMode();
  }

  switchMode(): void {
    if (this.mode === 'login') {
      this.mode = 'newAccount';
      (this.authForm.get('username') as FormControl).setValidators([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(usernamePattern),
      ]);
      return;
    }
    this.mode = 'login';
    (this.authForm.get('username') as FormControl).clearValidators();
    (this.authForm.get('username') as FormControl).reset();
  }

  onSubmit(): void {
    const username = (this.authForm.get('username') as FormControl).value;
    const email = (this.authForm.get('email') as FormControl).value;
    const password = (this.authForm.get('password') as FormControl).value;

    let success = false;

    if (this.mode === 'login') {
      success = this.loginService.login(email, password);
    }

    if (this.mode === 'newAccount') {
      const newUser = new User(username, email, password);
      success = this.loginService.addUser(newUser);
    }

    this.authForm.reset();

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
