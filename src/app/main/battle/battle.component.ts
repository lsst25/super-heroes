import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Hero } from '../../models/hero.model';
import { HeroStoreService } from '../../shared/hero-store.service';
import { FetchHeroesService } from '../../shared/fetch-heroes.service';
import { BattleService } from './battle.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleComponent implements OnInit, OnDestroy {
  ownHero!: Hero;
  ownHeroSub?: Subscription;
  enemyHero!: Hero;

  fighting = false;

  winner: string | null = null;

  constructor(
    private heroStoreService: HeroStoreService,
    private fetchHeroService: FetchHeroesService,
    private battle: BattleService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ownHeroSub = this.heroStoreService.selectedHeroSubject.subscribe(
      (hero) => (this.ownHero = hero as Hero)
    );
    this.getRandomHero();
  }

  onResultsClose(): void {
    this.winner = null;
  }

  onFight(): void {
    this.fighting = true;
    this.heroStoreService.usePowerups();

    this.battle
      .battle(this.ownHero as Hero, this.enemyHero as Hero)
      .subscribe((winner: Hero) => {
        this.winner = winner.name + ' won the fight!';
        this.fighting = false;
        this.cd.detectChanges();
      });
  }

  getRandomHero(): void {
    this.fetchHeroService.fetchRandomHero().subscribe((hero: Hero) => {
      this.enemyHero = hero;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.ownHeroSub?.unsubscribe();
  }
}
