import { Component, OnInit } from '@angular/core';
import {Hero} from "../hero.model";
import {HeroStoreService} from "../hero-store.service";
import {FetchHeroesService} from "../fetch-heroes.service";
import {BattleService} from "../battle.service";

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  ownHero!: Hero;
  enemyHero!: Hero;

  fighting = false;

  winner: string | null = null;

  constructor(private heroStoreService: HeroStoreService,
              private fetchHeroService: FetchHeroesService,
              private battle: BattleService) { }

  ngOnInit(): void {
    this.ownHero = this.heroStoreService.lastSelectedHero as Hero;
    this.getRandomHero();
  }

  onResultsClose() {
    this.winner = null;
  }

  onFight() {
    this.fighting = true;
    this.heroStoreService.selectedPowerupsIds.forEach(powerupId => {
      this.heroStoreService.usePowerup(powerupId);
    });
    this.heroStoreService.selectedPowerups = [];
    this.battle.battle(this.ownHero as Hero, this.enemyHero as Hero).subscribe((winner: Hero) => {

      this.winner = winner.name + ' won the fight!';
      this.fighting = false;
    })

  }

  getRandomHero() {
    this.fetchHeroService.fetchRandomHero().subscribe(
      (hero: Hero) => {
        this.enemyHero = hero;
      }
    );
  }
}