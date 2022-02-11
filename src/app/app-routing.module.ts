import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HeroSelectComponent} from "./hero-select/hero-select.component";
import {BattleComponent} from "./battle/battle.component";
import {UserInfoComponent} from "./user-info/user-info.component";
import {HeroesComponent} from "./user-info/heroes/heroes.component";
import {HistoryComponent} from "./user-info/history/history.component";
import {PowerupsComponent} from "./user-info/powerups/powerups.component";

const routes: Routes = [
  {path: '', redirectTo: 'select', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'select', component: HeroSelectComponent},
  {path: 'battle', component: BattleComponent},
  {path: 'user', component: UserInfoComponent, children: [
      {path: '', component: HeroesComponent, pathMatch: 'full'},
      {path: 'heroes', component: HeroesComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'powerups', component: PowerupsComponent},

    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
