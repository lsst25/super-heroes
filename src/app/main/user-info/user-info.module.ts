import { NgModule } from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { HistoryComponent } from './history/history.component';
import { PowerupsComponent } from './powerups/powerups.component';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import {UserInfoRouterModule} from "./user-info-router.module";
import {CommonModule} from "@angular/common";
import {UserInfoComponent} from "./user-info.component";

@NgModule({
  declarations: [UserInfoComponent, HeroesComponent, HistoryComponent, PowerupsComponent],
  imports: [
    CommonModule, // do I need it here?
    MaterialModule,
    SharedModule,
    UserInfoRouterModule
  ],
})
export class UserInfoModule {}
