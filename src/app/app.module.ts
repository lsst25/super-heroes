import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HeroSelectComponent } from './hero-select/hero-select.component';
import { BattleComponent } from './battle/battle.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AlertComponent } from './shared/alert/alert.component';
import { HeroSearchComponent } from './hero-select/hero-search/hero-search.component';
import {MatChipsModule} from "@angular/material/chips";
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import { AlphabeticalComponent } from './hero-select/alphabetical/alphabetical.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HeroSelectComponent,
    BattleComponent,
    UserInfoComponent,
    AlertComponent,
    HeroSearchComponent,
    AlphabeticalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    FormsModule,
    MatChipsModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
