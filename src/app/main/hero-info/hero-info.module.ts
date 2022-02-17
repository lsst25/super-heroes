import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroInfoComponent } from './hero-info.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuardService } from '../../core/auth/login/guards/login-guard.service';

const routes: Routes = [
  {
    path: ':id',
    component: HeroInfoComponent,
    canActivate: [LoginGuardService],
  },
];

@NgModule({
  declarations: [HeroInfoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class HeroInfoModule {}
