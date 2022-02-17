import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchOutputComponent} from "./search-output/search-output.component";
import {HeroSelectComponent} from "./hero-select.component";
import {HeroSelectRouterModule} from "./hero-select-router.module";
import {MaterialModule} from "../../shared/material.module";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [SearchOutputComponent, HeroSelectComponent],
  imports: [
    CommonModule,
    HeroSelectRouterModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HeroSelectModule { }
