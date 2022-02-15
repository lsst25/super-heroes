import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HeroStoreService, Powerup } from '../../../shared/hero-store.service';

@Component({
  selector: 'app-battle-menu',
  templateUrl: './battle-menu.component.html',
  styleUrls: ['./battle-menu.component.css'],
})
export class BattleMenuComponent implements OnInit, OnChanges {
  @Input() ownHeroName!: string;
  @Input() enemyHero!: string;
  @Input() fighting = false;
  @Output() readonly fight = new EventEmitter<void>();

  powerups: Powerup[] | null = null;

  constructor(private heroStoreService: HeroStoreService) {}

  ngOnInit(): void {
    this.powerups = [
      ...this.heroStoreService.powerups.filter((p) => p.usesLeft > 0),
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.powerups = [
      ...this.heroStoreService.powerups.filter((p) => p.usesLeft > 0),
    ];
  }

  isSelectedPowerup(index: number): boolean {
    return this.heroStoreService.selectedPowerupsIds.includes(index);
  }

  onSelectPowerup(id: number): void {
    if (!this.isSelectedPowerup(id)) {
      this.heroStoreService.selectPowerup(id);
      return;
    }
    this.heroStoreService.unselectPowerup(id);
  }

  onStart(): void {
    this.fight.emit();
  }
}
