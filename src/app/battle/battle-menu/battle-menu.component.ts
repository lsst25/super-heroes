import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-battle-menu',
  templateUrl: './battle-menu.component.html',
  styleUrls: ['./battle-menu.component.css']
})
export class BattleMenuComponent implements OnInit {
  @Input() ownHeroName!: string;
  @Input() enemyHero!: string;
  @Input() fighting = false;
  @Output() fight = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onStart() {
    this.fight.emit();
  }
}
