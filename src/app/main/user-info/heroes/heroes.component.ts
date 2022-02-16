import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Hero } from '../../../models/hero.model';
import { HeroStoreService } from '../../../shared/hero-store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroesComponent implements OnInit, OnDestroy {
  heroes: Hero[] = [];
  heroesSub?: Subscription;
  selectedHero: Hero | undefined | null = null;
  selectedHeroSub?: Subscription;

  constructor(private heroStoreService: HeroStoreService) {}

  ngOnInit(): void {
    this.heroesSub = this.heroStoreService.selectedHeroesSubject.subscribe(
      (heroes) => {
        this.heroes = heroes;
      }
    );

    this.selectedHeroSub = this.heroStoreService.selectedHeroSubject.subscribe(
      (hero) => {
        this.selectedHero = hero;
      }
    );
  }

  isSelectedHero(id: number): boolean {
    if (!this.selectedHero) {
      return false;
    }
    return this.selectedHero.id === id;
  }

  onReSelect(hero: Hero): void {
    this.heroStoreService.reSelectHero(hero);
  }

  ngOnDestroy(): void {
    this.heroesSub?.unsubscribe();
    this.selectedHeroSub?.unsubscribe();
  }
}
