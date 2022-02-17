import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserInfoComponent} from "./user-info.component";
import {LoginGuardService} from "../../core/auth/login/guards/login-guard.service";
import {HeroesComponent} from "./heroes/heroes.component";
import {HistoryComponent} from "./history/history.component";
import {PowerupsComponent} from "./powerups/powerups.component";

const routes: Routes = [
  {
    path: '',
    component: UserInfoComponent,
    canActivate: [LoginGuardService],
    children: [
      { path: '', component: HeroesComponent, pathMatch: 'full' },
      { path: 'heroes', component: HeroesComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'powerups', component: PowerupsComponent },
    ],
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserInfoRouterModule { }
