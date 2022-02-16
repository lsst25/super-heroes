import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Powerup, powerups } from '../models/powerup.model';
import { BehaviorSubject } from 'rxjs';
import { StateStoreService } from '../state-store.service';

@Injectable({
  providedIn: 'root',
})
export class HeroStoreService {
  selectedHeroes: Hero[] = [];
  selectedHeroesSubject = new BehaviorSubject<Hero[]>(this.selectedHeroes);

  lastSelectedHero: Hero | null = null;
  selectedHeroSubject = new BehaviorSubject<Hero | null>(this.lastSelectedHero);

  powerups: Powerup[] = powerups;
  powerupsSubject = new BehaviorSubject(this.powerups);

  constructor(
    private state: StateStoreService
  ) {}

  get selectedHeroesIds(): number[] {
    return this.selectedHeroes.map((hero) => hero.id);
  }

  toggleSelectPowerup(id: number): void {
    const powerup = this.powerups.find((powerup: Powerup) => powerup.id === id);
    if (powerup) {
      powerup.selected = !powerup.selected;
    }
    this.powerupsSubject.next([...this.powerups]);
  }

  usePowerups(): void {
    this.powerups.forEach((powerup) => {
      if (powerup.selected && powerup.usesLeft > 0) {
        powerup.usesLeft--;
      }
    });

    this.powerupsSubject.next([...this.powerups]);
    this.state.updatePowerups([...this.powerups]);
  }

  setSelectedHeroes(): void {
    this.selectedHeroes = this.state.getSelectedHeroes();
    this.lastSelectedHero = this.state.getSelectedHero();

    this.selectedHeroSubject.next(this.lastSelectedHero);
    this.selectedHeroesSubject.next(this.selectedHeroes);
  }

  setPowerups(): void {
    this.powerups = this.state.getPowerups();
    this.powerupsSubject.next(this.powerups);
  }

  reSelectHero(hero: Hero): void {
    this.lastSelectedHero = hero;
    this.selectedHeroSubject.next(hero);

    this.state.updateSelectedHero({ ...hero });
  }

  addSelectedHero(hero: Hero): void {
    this.selectedHeroes.push(hero);
    this.lastSelectedHero = hero;

    this.selectedHeroSubject.next(hero);
    this.selectedHeroesSubject.next(this.selectedHeroes);

    this.state.updateSelectedHeroes([...this.selectedHeroes]);
    this.state.updateSelectedHero({ ...hero });
  }

  isSelected(hero: Hero): boolean {
    return this.selectedHeroesIds.includes(hero.id);
  }
}
