import { Component, ViewChild } from '@angular/core';
import { Hero } from '../hero.model';
import { FetchHeroesService } from '../fetch-heroes.service';
import { NgForm } from '@angular/forms';
import { HeroStoreService } from '../hero-store.service';
import { Letters } from './alphabetical/alphabetical.component';
import { map} from 'rxjs';

@Component({
  selector: 'app-hero-select',
  templateUrl: './hero-select.component.html',
  styleUrls: ['./hero-select.component.css'],
})
export class HeroSelectComponent {
  heroes: Hero[] = [];

  @ViewChild('input') input: any;

  searchPattern = /(^([a-zA-Z][a-zA-Z -]*[a-zA-Z])$)|^[a-zA-Z]$/;

  recentSearches: string[] = [];

  constructor(
    private fetchService: FetchHeroesService,
    private heroStoreService: HeroStoreService
  ) {}

  onLetterSelected(letter: Letters) {
    this.input.nativeElement.value = letter;
    this.search(letter, true);
  }

  addToRecentSearches(term: string) {
    if (!this.recentSearches.includes(term)) {
      this.recentSearches.unshift(term);
    }

    if (this.recentSearches.length > 3) {
      this.recentSearches.pop();
    }
  }


  onSubmit(form: NgForm) {
    const term = form.value.search;
    this.search(term);
    this.addToRecentSearches(term);
    form.reset();
  }

  search(term: string, letterSearch = false): void {
    if (!letterSearch) {
      this.fetchService.fetchHeroesByName(term).subscribe((heroes) => {
        this.heroes = heroes;
      });
      return;
    }

    this.fetchService
      .fetchHeroesByName(term)
      .pipe(
        map((heroes: Hero[]) => {
          return heroes.filter((hero: Hero) => {
            return hero.name[0].toLowerCase() === term;
          });
        })
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
      },
        error => {
          console.log(error)
        });
  }
}
