import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'select', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./core/auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'select',
    loadChildren: () =>
      import('./main/hero-select/hero-select.module').then(
        (m) => m.HeroSelectModule
      ),
  },
  {
    path: 'battle',
    loadChildren: () =>
      import('./main/battle/battle.module').then((m) => m.BattleModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./main/user-info/user-info.module').then((m) => m.UserInfoModule),
  },
  {
    path: 'hero-info',
    loadChildren: () =>
      import('./main/hero-info/hero-info.module').then((m) => m.HeroInfoModule),
  },
  { path: '**', redirectTo: 'select'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
