import { Injectable } from '@angular/core';
import { Hero } from './hero.model';
import {delay, Observable, of} from 'rxjs';
import {StorageService} from "./storage.service";

export class Battle {
  constructor(
    public winner: string,
    public ownHero: string,
    public enemyHero: string,
    public ownHeroId: number,
    public enemyHeroId: number,
    public date: number
  ) {
    this.winner = winner;
    this.ownHero = ownHero;
    this.enemyHero = enemyHero;
    this.date = date;
    this.ownHeroId = ownHeroId;
    this.enemyHeroId = enemyHeroId;
  }
}

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  battles: Battle[] = [];

  constructor(private storage: StorageService) {}

  battle(ownHero: Hero, enemyHero: Hero): Observable<Hero> {
    const battleResult = Math.random() < 0.5;
    const winner = battleResult ? ownHero : enemyHero;

    this.addBattle(new Battle(winner.name, ownHero.name, enemyHero.name, ownHero.id, enemyHero.id, new Date().getTime()));

    return of(winner).pipe(delay(5000));
  }

  addBattle(battle: Battle): void {
    this.battles.push(battle);
    this.storage.addToStorage('battles', this.battles);
  }

  setBattles(): void {
    this.battles = this.storage.getFromStorage('battles') || [];
  }
}
