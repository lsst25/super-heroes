import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BattleComponent } from './battle.component';
import { LoginGuardService } from '../../core/auth/login/guards/login-guard.service';
import { BattleGuardService } from './battle.guard.service';

const routes: Routes = [
  {
    path: '',
    component: BattleComponent,
    canActivate: [LoginGuardService, BattleGuardService],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BattleRouterModule {}
