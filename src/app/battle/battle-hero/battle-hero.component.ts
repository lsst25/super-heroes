import {Component, Input} from '@angular/core';
import {Hero} from "../../hero.model";

@Component({
  selector: 'app-battle-hero',
  templateUrl: './battle-hero.component.html',
  styleUrls: ['./battle-hero.component.css']
})
export class BattleHeroComponent {
   @Input() hero?: Hero;
}
