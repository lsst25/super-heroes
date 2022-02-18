import { Injectable } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';
import { Battle } from '../../models/battle.model';
import { StateStoreService } from '../../shared/services/state-store.service';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  battles: Battle[] = [];
  battlesSubject = new BehaviorSubject<Battle[]>([...this.battles]);

  constructor(
    private storage: StorageService,
    private state: StateStoreService
  ) {}

  battle(ownHero: Hero, enemyHero: Hero): Observable<Hero> {
    let boost = 0;

    const {
      combat: ownCombat,
      strength: ownStrength,
      power: ownPower,
      speed: ownSpeed,
      durability: ownDurability,
      intelligence: ownIntelligence,
    } = ownHero.powerstats;

    const {
      combat: enemyCombat,
      strength: enemyStrength,
      power: enemyPower,
      speed: enemySpeed,
      durability: enemyDurability,
      intelligence: enemyIntelligence,
    } = enemyHero.powerstats;

    boost = ownCombat > enemyCombat ? boost + 0.1 : boost - 0.1;
    boost = ownStrength > enemyStrength ? boost + 0.09 : boost - 0.09;
    boost = ownPower > enemyPower ? boost + 0.08 : boost - 0.08;
    boost = ownSpeed > enemySpeed ? boost + 0.08 : boost - 0.08;
    boost = ownDurability > enemyDurability ? boost + 0.08 : boost - 0.08;
    boost = ownIntelligence > enemyIntelligence ? boost + 0.008 : boost - 0.08;

    const battleResult = Math.random() < 0.5 + boost;
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
