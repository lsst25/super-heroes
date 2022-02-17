import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../shared/material.module";
import {LoginGuardService} from "./guards/login-guard.service";

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuardService] },
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
