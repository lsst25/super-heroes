import { Injectable } from '@angular/core';
import { Hero } from '../../models/hero.model';
import {BehaviorSubject, delay, Observable, of} from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { Battle } from '../../models/battle.model';
import {StateStoreService} from "../../shared/services/state-store.service";

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  battles: Battle[] = [];
  battlesSubject = new BehaviorSubject<Battle[]>([...this.battles]);

  constructor(private storage: StorageService,
              private state: StateStoreService) {}

  battle(ownHero: Hero, enemyHero: Hero): Observable<Hero> {
    const battleResult = Math.random() < 0.5;
    const winner = battleResult ? ownHero : enemyHero;

    this.addBattle(
      new Battle(
        winner.name,
        ownHero.name,
        enemyHero.name,
        ownHero.id,
        enemyHero.id,
        new Date().getTime()
      )
    );

    return of(winner).pipe(delay(5000));
  }

  private addBattle(battle: Battle): void {
    this.battles.push(battle);

    this.battlesSubject.next([...this.battles]);
    this.state.updateBattles([...this.battles]);
  }

  setBattles(): void {
    this.battles = this.state.getBattles();
    this.battlesSubject.next([...this.battles]);
  }
}
