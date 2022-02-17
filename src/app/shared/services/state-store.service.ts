import { Injectable } from '@angular/core';
import { UsersState } from '../../models/users-state.model';
import { Hero } from '../../models/hero.model';
import { StorageService } from './storage.service';
import { LoginService } from '../../core/auth/login/login.service';
import {Battle} from "../../models/battle.model";
import {Powerup, powerups} from "../../models/powerup.model";

@Injectable({
  providedIn: 'root',
})
export class StateStoreService {
  currentState: UsersState = {
    selectedHeroes: [],
    selectedHero: null,
    battles: [],
    powerups: powerups,
    recentSearches: [],
  };
  constructor(private storage: StorageService, private login: LoginService) {}

  getSelectedHeroes(): Hero[] {
    return [...this.currentState.selectedHeroes];
  }

  getSelectedHero(): Hero | null {
    if (this.currentState.selectedHero) {
      return {...this.currentState.selectedHero};
    }
    return null
  }

  getBattles(): Battle[] {
    return [...this.currentState.battles];
  }

  getPowerups(): Powerup[] {
    if (this.currentState.powerups.length === 0) {
      return powerups;
    }
    return [...this.currentState.powerups];
  }

  getRecentSearches(): string[] {
    return [...this.currentState.recentSearches];
  }

  updateSelectedHeroes(heroes: Hero[]): void {
    this.currentState.selectedHeroes = heroes;
    this.saveState();
  }

  updateSelectedHero(hero: Hero): void {
    this.currentState.selectedHero = hero;
    this.saveState();
  }

  updateBattles(battles: Battle[]): void {
    this.currentState.battles = battles;
    this.saveState();
  }

  updatePowerups(powerups: Powerup[]): void {
    this.currentState.powerups = powerups;
    this.saveState();
  }

  updateRecentSearches(recentSearches: string[]): void {
    this.currentState.recentSearches = recentSearches;
    this.saveState();
  }

  getState(userKey: string) {
    const state = this.storage.getFromStorage(userKey);
    if (state) {
      this.currentState = state;
    }
  }

  saveState() {
    const userKey = this.login.userKey;
    if (userKey) {
      this.storage.addToStorage(userKey, this.currentState);
    }
  }
}
