export interface Hero {
  id: number;
  name: string;
  image: {
    url: string
  }
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  }
  biography: {
    'full-name': string
  }
}
