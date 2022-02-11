import { Component, OnInit } from '@angular/core';
import {Hero} from "../../hero.model";
import {HeroStoreService} from "../../hero-store.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero: Hero | undefined | null = null;

  constructor(private heroStoreService: HeroStoreService) { }

  ngOnInit(): void {
    this.heroes = this.heroStoreService.selectedHeroes;
    this.selectedHero = this.heroStoreService.lastSelectedHero;
  }

  isSelectedHero(id: number) {
    if (!this.selectedHero) {
      return false;
    }
    return this.selectedHero.id === id;
  }

  onReSelect(hero: Hero) {
    this.heroStoreService.reSelectHero(hero);
    this.selectedHero = hero;
  }

}
