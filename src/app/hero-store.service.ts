import { Injectable } from '@angular/core';
import {Hero} from "./hero.model";
import {StorageService} from "./storage.service";

export type Powerup = {
  id: number;
  title: string;
  image: string;
  stats: string;
  usesLeft: number;
}

@Injectable({
  providedIn: 'root',
})
export class HeroStoreService {

  selectedHeroes: Hero[] = [];
  selectedPowerups: Powerup[] = [];

  lastSelectedHero?: Hero;
  powerups: Powerup[] = [
    {id: 0, title: 'Captain America shield', image: 'https://i.pinimg.com/originals/a6/3a/b2/a63ab2f1ae5daf748d2aea2b56f2439d.png', stats: 'durability +10', usesLeft: 3},
    {id: 1, title: 'Mjolnir', image: 'https://media.nauticamilanonline.com/product/replica-hasbro-marvel-martillo-thor-mjolnir-con-luz-800x800.jpg', stats: 'power +10', usesLeft: 3},
    {id: 2, title: 'Ironman nano armor', image: 'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/a0/Iron_Man_Armor_-_Mark_L.png', stats: 'intelligence + 10', usesLeft: 3},
    {id: 3, title: 'Green lantern\'s ring', image: 'https://www.superherorings.com/image/catalog/Green_Lantern_Ring_Snake.jpg', stats: 'strength +10', usesLeft: 3},
    {id: 4, title: 'Flash boots', image: 'https://ae01.alicdn.com/kf/HTB18oXUhb1YBuNjSszeq6yblFXaT.jpg', stats: 'speed +10', usesLeft: 3},
  ];

  constructor(private storageService: StorageService) {}

  get selectedHeroesIds() {
    return this.selectedHeroes.map(hero => hero.id);
  }

  get selectedPowerupsIds() {
    return this.selectedPowerups.map((powerup: Powerup) => powerup.id);
  }

  selectPowerup(id: number) {
    this.selectedPowerups.push((this.powerups.find(powerup => powerup.id === id) as Powerup));
  }

  unselectPowerup(id: number) {
    this.selectedPowerups = this.selectedPowerups.filter(powerup => powerup.id !== id);
  }

  usePowerup(id: number) {
    const powerupToUpdate = this.powerups.find(powerup => powerup.id === id);
    if (powerupToUpdate) {
      powerupToUpdate.usesLeft--;
    }

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
