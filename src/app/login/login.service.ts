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
  currentUser = new Subject<User | null>();
  error = new Subject<string>();
  registeredUsers: string[] = [];
  sessionDurationLimit = 3.6e6; // 3.6e6 - 1h

  constructor(private storageService: StorageService, private router: Router) {}

  autoLogin() {
    const userFromStorage: User = this.storageService.getFromStorage('user');
    const token = this.storageService.getFromStorage('token');
    const tokenIsValid =
      new Date().getTime() - +token < this.sessionDurationLimit;

    if (!token) {
      return;
    }

    if (!tokenIsValid) {
      this.storageService.removeFromStorage('token', 'user');

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

  login(email: string, password: string, autologin = false) {
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

      console.log('User ' + user.username + ' logged in.');
      return true;
    }
    this.error.next('Wrong password!');
    console.log('Wrong password!');
    return false;
  }

  logout() {
    this.currentUser.next(null);
    this.storageService.removeFromStorage('user');
    this.router.navigate(['login']);
  }

  getUser(email: string) {
    return this.users.find((user: User) => user.email === email);
  }

  setUsers() {
    this.users = this.storageService.getFromStorage('users') || [];
  }

  setRegisteredUsers() {
    this.registeredUsers =
      this.storageService.getFromStorage('registeredUsers') || [];
  }

  addUser(newUser: User) {
    if (!this.users.find((user: User) => user.email === newUser.email)) {
      this.users.push(newUser);
      this.storageService.addToStorage('users', this.users);
      this.storageService.addToStorage('registeredUsers', [
        ...this.registeredUsers,
        newUser.username,
      ]);
      this.registeredUsers.push(newUser.username);
      console.log('New user added.');
      return true;
    }
    this.error.next('This email already exists.');
    console.log('This email already exists.');
    return false;
  }
}
