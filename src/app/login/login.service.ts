import { Injectable } from '@angular/core';
import { User } from '../user.model';
import { Subject } from 'rxjs';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private users: User[] = [];
  private authenticated = false;

  currentUser = new Subject<User | null>();
  error = new Subject<string>();
  sessionDurationLimit = 3.6e6;

  constructor(private storageService: StorageService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.authenticated;
  }

  autoLogin(): void {
    const userFromStorage: User = this.storageService.getFromStorage('user');
    const token = this.storageService.getFromStorage('token');
    const tokenIsValid =
      new Date().getTime() - +token < this.sessionDurationLimit;

    if (!token) {
      return;
    }

    if (!tokenIsValid) {
      this.storageService.removeFromStorage(
        'token',
        'user',
        'selectedHeroes',
        'lastSelectedHero'
      );

      this.router.navigate(['login']);
      this.error.next(
        'Your current session has expired. Please login again to continue using this app!'
      );
      return;
    }

    if (userFromStorage && token && tokenIsValid) {
      this.login(userFromStorage.email, userFromStorage.password, true);
      this.currentUser.next(userFromStorage);
      console.log('Autologin success');
      return;
    }
  }

  login(email: string, password: string, autologin = false): boolean {
    const user = this.getUser(email);

    if (!user) {
      this.error.next('No user with this email was found.');
      console.log('No user with this email was found.');
      return false;
    }
    if (user.password === password) {
      this.currentUser.next(user);
      this.storageService.addToStorage('user', user);

      if (!autologin) {
        this.storageService.addToStorage('token', new Date().getTime());
      }
      this.authenticated = true;
      console.log('User ' + user.username + ' logged in.');
      return true;
    }
    this.error.next('Wrong password!');
    console.log('Wrong password!');
    return false;
  }

  logout(): void {
    this.currentUser.next(null);
    this.storageService.removeFromStorage(
      'user',
      'token',
      'selectedHeroes',
      'lastSelectedHero'
    );
    this.router.navigate(['login']);
  }

  getUser(email: string): User | undefined {
    return this.users.find((user: User) => user.email === email);
  }

  setUsers(): void {
    this.users = this.storageService.getFromStorage('users') || [];
  }

  addUser(newUser: User): boolean {
    if (!this.users.find((user: User) => user.email === newUser.email)) {
      this.users.push(newUser);
      this.storageService.addToStorage('users', this.users);
      console.log('New user added.');
      return true;
    }
    this.error.next('This email already exists.');
    console.log('This email already exists.');
    return false;
  }
}
