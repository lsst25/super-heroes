export interface Powerup {
  id: number;
  title: string;
  image: string;
  stats: string;
  usesLeft: number;
  selected: boolean;
}

export const powerups: Powerup[] = [
  {
    id: 0,
    title: 'Captain America shield',
    image:
      'https://i.pinimg.com/originals/a6/3a/b2/a63ab2f1ae5daf748d2aea2b56f2439d.png',
    stats: 'durability +10',
    usesLeft: 3,
    selected: false,
  },
  {
    id: 1,
    title: 'Mjolnir',
    image:
      'https://media.nauticamilanonline.com/product/replica-hasbro-marvel-martillo-thor-mjolnir-con-luz-800x800.jpg',
    stats: 'power +10',
    usesLeft: 3,
    selected: false,
  },
  {
    id: 2,
    title: 'Ironman nano armor',
    image:
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/a0/Iron_Man_Armor_-_Mark_L.png',
    stats: 'intelligence + 10',
    usesLeft: 3,
    selected: false,
  },
  {
    id: 3,
    title: "Green lantern's ring",
    image:
      'https://www.superherorings.com/image/catalog/Green_Lantern_Ring_Snake.jpg',
    stats: 'strength +10',
    usesLeft: 3,
    selected: false,
  },
  {
    id: 4,
    title: 'Flash boots',
    image: 'https://ae01.alicdn.com/kf/HTB18oXUhb1YBuNjSszeq6yblFXaT.jpg',
    stats: 'speed +10',
    usesLeft: 3,
    selected: false,
  },
];
