import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/auth/login/login.component';
import { HeroSelectComponent } from './main/hero-select/hero-select.component';
import { BattleComponent } from './main/battle/battle.component';
import { UserInfoComponent } from './main/user-info/user-info.component';
import { HeroesComponent } from './main/user-info/heroes/heroes.component';
import { HistoryComponent } from './main/user-info/history/history.component';
import { PowerupsComponent } from './main/user-info/powerups/powerups.component';
import { LoginGuardService } from './core/auth/login/guards/login-guard.service';
import {BattleGuardService} from "./main/battle/battle.guard.service";
import {HeroInfoComponent} from "./main/hero-info/hero-info.component";

const routes: Routes = [
  { path: '', redirectTo: 'select', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'select',
    component: HeroSelectComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'battle',
    component: BattleComponent,
    canActivate: [LoginGuardService, BattleGuardService],
  },
  {
    path: 'hero-info/:id',
    component: HeroInfoComponent,
    canActivate: [LoginGuardService],
  },
  {
    path: 'user',
    component: UserInfoComponent,
    canActivate: [LoginGuardService],
    children: [
      { path: '', component: HeroesComponent, pathMatch: 'full' },
      { path: 'heroes', component: HeroesComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'powerups', component: PowerupsComponent },
    ],
  },
  { path: '**', redirectTo: '/select' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
