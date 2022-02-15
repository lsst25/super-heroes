import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './core/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HeroSelectComponent } from './main/hero-select/hero-select.component';
import { BattleComponent } from './main/battle/battle.component';
import { UserInfoComponent } from './main/user-info/user-info.component';
import { AlertComponent } from './shared/alert/alert.component';
import { HttpClientModule } from '@angular/common/http';
import { AlphabeticalComponent } from './shared/alphabetical/alphabetical.component';
import { HeroesComponent } from './main/user-info/heroes/heroes.component';
import { HistoryComponent } from './main/user-info/history/history.component';
import { PowerupsComponent } from './main/user-info/powerups/powerups.component';
import { HeroCardComponent } from './shared/hero-card/hero-card.component';
import { BattleHeroComponent } from './main/battle/battle-hero/battle-hero.component';
import { BattleMenuComponent } from './main/battle/battle-menu/battle-menu.component';
import { HeroInfoComponent } from './main/hero-info/hero-info.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HeroSelectComponent,
    BattleComponent,
    UserInfoComponent,
    AlertComponent,
    AlphabeticalComponent,
    HeroesComponent,
    HistoryComponent,
    PowerupsComponent,
    HeroCardComponent,
    BattleHeroComponent,
    BattleMenuComponent,
    HeroInfoComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
