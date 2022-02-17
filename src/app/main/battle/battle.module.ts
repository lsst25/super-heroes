import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleHeroComponent } from './battle-hero/battle-hero.component';
import { BattleMenuComponent } from './battle-menu/battle-menu.component';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { BattleComponent } from './battle.component';
import { RouterModule } from '@angular/router';
import {BattleRouterModule} from "./battle-router.module";



@NgModule({
  declarations: [BattleComponent, BattleHeroComponent, BattleMenuComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    BattleRouterModule
  ],
  exports: [RouterModule],
})
export class BattleModule {}
