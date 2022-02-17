import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HeroSelectComponent} from "./hero-select.component";
import {LoginGuardService} from "../../core/auth/login/guards/login-guard.service";

const routes: Routes = [
  {
    path: '',
    component: HeroSelectComponent,
    canActivate: [LoginGuardService],
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HeroSelectRouterModule { }
