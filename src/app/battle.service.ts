import { Injectable } from '@angular/core';
import { Hero } from './hero.model';
import { delay, of } from 'rxjs';
import {StorageService} from "./storage.service";

export class Battle {
  constructor(
    public winner: string,
    public ownHero: string,
    public enemyHero: string,
    public date: Date
  ) {
    this.winner = winner;
    this.ownHero = ownHero;
    this.enemyHero = enemyHero;
    this.date = date;
  }
}

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  battles: Battle[] = [];

  constructor(private storage: StorageService) {}

  battle(ownHero: Hero, enemyHero: Hero) {
    const battleResult = Math.random() < 0.5;
    const winner = battleResult ? ownHero : enemyHero;

    this.addBattle(new Battle(winner.name, ownHero.name, enemyHero.name, new Date()));

    return of(winner).pipe(delay(5000));
  }

  addBattle(battle: Battle) {
    this.battles.push(battle);
    this.storage.addToStorage('battles', this.battles);
  }

  setBattles() {
    this.battles = this.storage.getFromStorage('battles') || [];
  }
}
