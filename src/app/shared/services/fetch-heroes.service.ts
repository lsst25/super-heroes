import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Hero } from '../../models/hero.model';

type Response = {
  response: string;
  results?: Hero[];
  error?: string;
  'results-for': string;
};

@Injectable({
  providedIn: 'root',
})
export class FetchHeroesService {
  heroesOverall = 731;

  constructor(private http: HttpClient) {}

  url = environment.apiUrl + environment.apiToken;

  fetchHeroById(id: number): Observable<Hero> {
    return this.http.get<Hero>(this.url + id);
  }

  fetchHeroesByName(name: string): Observable<Hero[]> {
    return this.http.get<Response>(this.url + 'search/' + name).pipe(
      map((response: Response) => {
        if (response.response === 'error') {
          return [] as Hero[];
        }
        return response.results as Hero[];
      })
    );
  }

  fetchRandomHero(): Observable<Hero> {
    return this.http.get<Hero>(
      this.url + Math.floor(Math.random() * this.heroesOverall)
    );
  }
}
