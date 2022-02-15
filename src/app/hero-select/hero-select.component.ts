import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Hero } from '../hero.model';
import { FetchHeroesService } from '../fetch-heroes.service';
import { NgForm } from '@angular/forms';
import { Letters } from './alphabetical/alphabetical.component';
import {map, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-hero-select',
  templateUrl: './hero-select.component.html',
  styleUrls: ['./hero-select.component.css'],
})
export class HeroSelectComponent implements OnInit, OnDestroy {
  heroes = new Subject<Hero[]>();
  heroesSub?: Subscription;

  heroSearchOutput: Hero[] = [];

  @ViewChild('input') input: any;

  searchPattern = /(^([a-zA-Z][a-zA-Z -]*[a-zA-Z])$)|^[a-zA-Z]$/;

  recentSearches: string[] = [];

  constructor(
    private fetchService: FetchHeroesService
  ) {}

  ngOnInit(): void {
    this.heroesSub = this.heroes.subscribe((output: Hero[]) => this.heroSearchOutput = output);
  }

  onLetterSelected(letter: Letters): void {
    this.input.nativeElement.value = letter;
    this.search(letter, true);
  }

  addToRecentSearches(term: string): void {
    if (!this.recentSearches.includes(term)) {
      this.recentSearches.unshift(term);
    }

    if (this.recentSearches.length > 3) {
      this.recentSearches.pop();
    }
  }

  onSubmit(form: NgForm): void {
    const term = form.value.search;
    this.search(term);
    this.addToRecentSearches(term);
    form.reset();
  }

  search(term: string, letterSearch = false): void {
    if (!letterSearch) {
      this.fetchService.fetchHeroesByName(term).subscribe((heroes) => {
        this.heroes.next(heroes);
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
      .subscribe({
        next: (heroes: Hero[]) => {
          this.heroes.next(heroes);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.heroesSub) {
      this.heroesSub.unsubscribe();
    }
  }
}
