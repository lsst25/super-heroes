import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root',
})
export class FetchHeroesService {
  heroesOverall = 731;

  constructor(private http: HttpClient) {}

  url = environment.apiUrl + environment.apiToken;

  fetchHeroById(id: number) {
    return this.http.get<Hero>('https://superheroapi.com/api.php/2089982224508380/' + id);
  }

  fetchHeroesByName(name: string): Observable<Hero[]> {
    return this.http
      .get<{ response: string; results: []; error?: string }>(
        'https://superheroapi.com/api.php/2089982224508380/search/' + name
      )
      .pipe(map((response) => {
        if (response.response === 'error') {
          return [];
        }
        return response.results
      }));
  }

  fetchRandomHero() {
    return this.http.get<Hero>(
      'https://superheroapi.com/api.php/2089982224508380/' +
        Math.floor(Math.random() * this.heroesOverall)
    );
  }
}
