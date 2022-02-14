import {Hero} from "./hero.model";

export class User implements User {
  username: string;
  email: string;
  password: string;
  selectedHeroes: Hero[]

  constructor(username: string, email: string, password: string) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.selectedHeroes = [];
  }

  addSelectedHero(hero: Hero) {
    this.selectedHeroes = [...this.selectedHeroes, hero];
  }

  removeSelectedHero(id: number) {
    this.selectedHeroes = this.selectedHeroes.filter(h => h.id !== id);
  }
}
