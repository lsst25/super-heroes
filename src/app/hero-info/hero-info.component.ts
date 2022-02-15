import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Hero } from '../hero.model';
import { ActivatedRoute } from '@angular/router';
import { FetchHeroesService } from '../fetch-heroes.service';

@Component({
  selector: 'app-hero-info',
  templateUrl: './hero-info.component.html',
  styleUrls: ['./hero-info.component.css'],
})
export class HeroInfoComponent implements OnInit {
  hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fetchHeroesService: FetchHeroesService
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.location.back();
    }
    this.fetchHeroesService
      .fetchHeroById(id)
      .subscribe((hero: Hero) => (this.hero = hero));
  }
}
