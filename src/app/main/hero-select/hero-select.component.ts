import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Hero } from '../../models/hero.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HeroSearchService } from './hero-search.service';
import { Letter } from '../../models/letters.model';
import { StateStoreService } from '../../shared/services/state-store.service';
import { searchPattern } from '../../shared/constatnts';

@Component({
  selector: 'app-hero-select',
  templateUrl: './hero-select.component.html',
  styleUrls: ['./hero-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSelectComponent implements OnInit, OnDestroy {
  heroesSub?: Subscription;
  heroSearchOutput: Hero[] = [];

  searchForm = new FormGroup({
    searchInput: new FormControl('', [
      Validators.required,
      Validators.pattern(searchPattern),
    ]),
  });

  recentSearches: string[] = [];

  constructor(
    private searchService: HeroSearchService,
    private cd: ChangeDetectorRef,
    private state: StateStoreService
  ) {}

  ngOnInit(): void {
    this.heroesSub = this.searchService.heroes.subscribe((output: Hero[]) => {
      this.heroSearchOutput = output;
      this.cd.detectChanges();
    });
    this.recentSearches = this.state.getRecentSearches();
  }

  onSearch(term: string) {
    this.searchService.search(term);
  }

  onLetterSelected(letter: Letter): void {
    (this.searchForm.get('searchInput') as FormControl).setValue(letter);
    this.searchService.search(letter, true);
  }

  addToRecentSearches(term: string): void {
    if (!this.recentSearches.includes(term)) {
      this.recentSearches.unshift(term);
    }

    if (this.recentSearches.length > 4) {
      this.recentSearches.pop();
    }
    this.state.updateRecentSearches([...this.recentSearches]);
  }

  onSubmit(): void {
    console.log(this.searchForm.value);
    const term = (this.searchForm.get('searchInput') as FormControl).value;
    console.log(this.searchForm.get('searchInput') as FormControl);
    this.searchService.search(term);
    this.addToRecentSearches(term);
    this.searchForm.reset();
  }

  ngOnDestroy(): void {
    if (this.heroesSub) {
      this.heroesSub.unsubscribe();
    }
  }
}
