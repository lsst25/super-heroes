import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {map, Observable} from "rxjs";
import {Hero} from "./hero.model";

@Injectable({
  providedIn: 'root'
})
export class FetchHeroesService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl + environment.apiToken;

  fetchHeroesByName(name: string): Observable<Hero[]> {
    return this.http.get<{ results: [] }>('https://superheroapi.com/api.php/2089982224508380/search/' + name)
      .pipe(
        map(response => response.results)
      );
  }

  fetchHeroById(id: number) {
    return this.http.get(this.url + '/' + id);
  }
}
