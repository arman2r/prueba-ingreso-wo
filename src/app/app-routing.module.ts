import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teamsList',
    pathMatch: 'full'
  },
  {
    path: 'teamsList',
    loadChildren: () =>
      import('./pages/teams-list/teams-list.module').then(
        (m) => m.TeamsListModule
      ),
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
