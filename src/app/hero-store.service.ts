import { Injectable } from '@angular/core';
import {Hero} from "./hero.model";
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root',
})
export class HeroStoreService {
  selectedHeroes: Hero[] = [];

  lastSelectedHero?: Hero;

  constructor(private storageService: StorageService) {}

  get selectedHeroesIds() {
    return this.selectedHeroes.map(hero => hero.id);
  }

  setSelectedHeroes() {
    this.selectedHeroes = this.storageService.getFromStorage('selectedHeroes') || [];
    this.lastSelectedHero = this.storageService.getFromStorage('lastSelectedHero' || undefined);
  }

  reSelectHero(hero: Hero) {
    this.lastSelectedHero = hero;
    this.storageService.addToStorage('lastSelectedHero', this.lastSelectedHero);
  }

  addSelectedHero(hero: Hero): void {
    this.selectedHeroes.push(hero);
    this.lastSelectedHero = hero;
    this.storageService.addToStorage('lastSelectedHero', this.lastSelectedHero);
    this.storageService.addToStorage('selectedHeroes', this.selectedHeroes);
  }

  isSelected(hero: Hero): boolean {
    return this.selectedHeroesIds.includes(hero.id);
  }

}
