export class Battle {
  constructor(
    public winner: string,
    public ownHero: string,
    public enemyHero: string,
    public ownHeroId: number,
    public enemyHeroId: number,
    public date: number
  ) {
    this.winner = winner;
    this.ownHero = ownHero;
    this.enemyHero = enemyHero;
    this.date = date;
    this.ownHeroId = ownHeroId;
    this.enemyHeroId = enemyHeroId;
  }
}
