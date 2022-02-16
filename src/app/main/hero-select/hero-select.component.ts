import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {Hero} from '../../models/hero.model';
import {NgForm} from '@angular/forms';
import {Letters} from '../../shared/alphabetical/alphabetical.component';
import {Subscription} from 'rxjs';
import {HeroSearchService} from './hero-search.service';

@Component({
  selector: 'app-hero-select',
  templateUrl: './hero-select.component.html',
  styleUrls: ['./hero-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSelectComponent implements OnInit, OnDestroy {
  heroesSub?: Subscription;

  heroSearchOutput: Hero[] = [];

  @ViewChild('input') input!: ElementRef;
  searchPattern = /(^([a-zA-Z][a-zA-Z -]*[a-zA-Z])$)|^[a-zA-Z]$/;
  recentSearches: string[] = [];

  constructor(private searchService: HeroSearchService,
              private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.heroesSub = this.searchService.heroes.subscribe(
      (output: Hero[]) => {
        this.heroSearchOutput = output;
        this.cd.detectChanges();
      }
    );
  }

  onSearch(term: string) {
    this.searchService.search(term);
  }

  onLetterSelected(letter: Letters): void {
    this.input.nativeElement.value = letter;
    this.searchService.search(letter, true);
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
    this.searchService.search(term);
    this.addToRecentSearches(term);
    form.reset();
  }

  ngOnDestroy(): void {
    if (this.heroesSub) {
      this.heroesSub.unsubscribe();
    }
  }
}
