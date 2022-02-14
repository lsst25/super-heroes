import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../hero.model";
import {HeroStoreService} from "../hero-store.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css']
})
export class HeroCardComponent implements OnInit {
  @Input() hero!: Hero;
  @Input() selected: boolean = false;
  @Input() viewHeroButton: boolean = false;
  constructor(private heroStoreService: HeroStoreService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSelectHero(hero: Hero) {
    this.heroStoreService.addSelectedHero(hero);
  }

  heroIsSelected(hero: Hero) {
    return this.heroStoreService.isSelected(hero);
  }

  onViewHeroButton(event: Event, hero: Hero) {
    event.stopPropagation();
    console.log(event, hero);
    this.router.navigate(['hero-info/' + hero.id])
  }

}
