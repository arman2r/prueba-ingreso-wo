import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamsListComponent } from './teams-list.component';
import { RegisterTeamComponent } from './register-team/register-team.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: "teamsList",
    pathMatch: 'full'
  },
  {
    path: '',
    component: TeamsListComponent,
  },
  {
    path: 'register-team',
    component: RegisterTeamComponent
    //canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeamsListRoutingModule {}
