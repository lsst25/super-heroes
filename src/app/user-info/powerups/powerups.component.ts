import { Component, OnInit } from '@angular/core';
import { HeroStoreService, Powerup } from '../../hero-store.service';

@Component({
  selector: 'app-powerups',
  templateUrl: './powerups.component.html',
  styleUrls: ['./powerups.component.css'],
})
export class PowerupsComponent implements OnInit {
  powerups: Powerup[] = [];

  constructor(private heroStoreService: HeroStoreService) {}

  ngOnInit(): void {
    this.powerups = [...this.heroStoreService.powerups];
  }
}
