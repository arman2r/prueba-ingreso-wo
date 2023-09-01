import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsListRoutingModule } from './teams-list-routing.module';
import { DeleteTeamConfirmComponent } from './table/delete-team-confirm/delete-team-confirm.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TeamsListRoutingModule
  ],
})
export class TeamsListModule {}
