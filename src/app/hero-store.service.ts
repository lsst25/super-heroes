import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeroStoreService {
  selectedHeroesIds: number[] = [];
  lastSelectedHero: number = 0;

  constructor() {}

  addSelectedHero(id: number): void {
    this.selectedHeroesIds.push(id);
    this.lastSelectedHero = id;
  }

  isSelected(id: number): boolean {
    return this.selectedHeroesIds.includes(id);
  }

  getSelectedHeroId(): number {
    return this.lastSelectedHero;
  }

  getSelectedHeroesIds(): number[] {
    return [...this.selectedHeroesIds];
  }
}
