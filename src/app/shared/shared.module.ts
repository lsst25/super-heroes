import { NgModule } from '@angular/core';
import { AlphabeticalComponent } from './components/alphabetical/alphabetical.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { MaterialModule } from './material.module';
import { AlertComponent } from './components/alert/alert.component';
import { LoadChildDirective } from '../load-child.directive';

@NgModule({
  declarations: [
    AlphabeticalComponent,
    HeroCardComponent,
    AlertComponent,
    LoadChildDirective,
  ],
  imports: [MaterialModule],
  exports: [
    AlphabeticalComponent,
    HeroCardComponent,
    AlertComponent,
    LoadChildDirective,
  ],
})
export class SharedModule {}
