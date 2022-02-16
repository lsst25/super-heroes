import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Hero } from '../../../models/hero.model';
import { HeroStoreService } from '../../../shared/hero-store.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero: Hero | undefined | null = null;

  constructor(private heroStoreService: HeroStoreService) {}

  ngOnInit(): void {
    this.heroes = this.heroStoreService.selectedHeroes;
    this.selectedHero = this.heroStoreService.lastSelectedHero;
  }

  isSelectedHero(id: number): boolean {
    if (!this.selectedHero) {
      return false;
    }
    return this.selectedHero.id === id;
  }

  onReSelect(hero: Hero): void {
    this.heroStoreService.reSelectHero(hero);
    this.selectedHero = hero;
  }
}
