import { Component, Input } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { HeroStoreService } from '../hero-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  @Input() selected = false;
  @Input() viewHeroButton = false;

  constructor(
    private heroStoreService: HeroStoreService,
    private router: Router
  ) {}

  onSelectHero(hero: Hero): void {
    this.heroStoreService.addSelectedHero(hero);
  }

  heroIsSelected(hero: Hero): boolean {
    return this.heroStoreService.isSelected(hero);
  }

  onViewHeroButton(event: Event, hero: Hero): void {
    event.stopPropagation();
    this.router.navigate(['hero-info/' + hero.id]);
  }
}
