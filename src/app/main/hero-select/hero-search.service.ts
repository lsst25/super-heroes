import { Injectable } from '@angular/core';
import {map, Subject} from "rxjs";
import {Hero} from "../../models/hero.model";
import {FetchHeroesService} from "../../shared/fetch-heroes.service";

@Injectable({
  providedIn: 'root'
})
export class HeroSearchService {
  heroes = new Subject<Hero[]>();

  constructor(private fetch: FetchHeroesService) {}

  search(term: string, letterSearch = false): void {
    if (!letterSearch) {
      this.fetch.fetchHeroesByName(term).subscribe((heroes) => {
        this.heroes.next(heroes);
      });
      return;
    }

    this.fetch
      .fetchHeroesByName(term)
      .pipe(
        map((heroes: Hero[]) => {
          return heroes.filter((hero: Hero) => {
            return hero.name[0].toLowerCase() === term;
          });
        })
      )
      .subscribe({
        next: (heroes: Hero[]) => {
          this.heroes.next(heroes);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
