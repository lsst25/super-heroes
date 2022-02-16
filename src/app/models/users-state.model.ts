import {Hero} from "./hero.model";
import {Battle} from "./battle.model";
import {Powerup} from "./powerup.model";

export interface UsersState {
  selectedHeroes: Hero[];
  selectedHero: Hero | null;
  battles: Battle[];
  powerups: Powerup[];
  recentSearches: string[];
}
