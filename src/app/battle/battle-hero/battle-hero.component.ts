import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "../../hero.model";

@Component({
  selector: 'app-battle-hero',
  templateUrl: './battle-hero.component.html',
  styleUrls: ['./battle-hero.component.css']
})
export class BattleHeroComponent implements OnInit {
   // @Input() own!: boolean;
   @Input() hero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
