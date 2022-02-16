import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { HeroStoreService } from '../../../shared/hero-store.service';
import { Powerup } from '../../../models/powerup.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-battle-menu',
  templateUrl: './battle-menu.component.html',
  styleUrls: ['./battle-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattleMenuComponent implements OnInit, OnDestroy {
  @Input() ownHeroName!: string;
  @Input() enemyHero!: string;
  @Input() fighting = false;
  @Output() readonly fight = new EventEmitter<void>();

  powerups: Powerup[] | null = null;
  powerupsSub?: Subscription;

  constructor(private heroStoreService: HeroStoreService) {}

  ngOnInit(): void {
    this.powerupsSub = this.heroStoreService.powerupsSubject.subscribe(
      (powerups) => {
        this.powerups = powerups.filter(p => p.usesLeft > 0);
      }
    );
  }

  onSelectPowerup(id: number): void {
    this.heroStoreService.toggleSelectPowerup(id);
  }

  onStart(): void {
    this.fight.emit();
  }

  ngOnDestroy(): void {
    this.powerupsSub?.unsubscribe();
  }
}
