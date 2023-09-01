import { Component } from '@angular/core';
import { TableComponent } from './table/table.component';
import { UtilService } from 'src/app/services/util.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationServiceService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
  imports: [
    TableComponent,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    RouterLink,
  ],
})
export class TeamsListComponent {
  notEditOrRemove = true;
  teamsList = [];
  currentUser = true;

  constructor(private util: UtilService, private authService: AuthenticationServiceService) {}

  ngOnInit(): void {
    this.getAllListTeams('0/1000');

    this.currentUser = this.authService.currentUserValue ? false : true;
    if (this.currentUser) {
      console.log('esta logueado')
    } else {
      console.log('no esta logueado')
    }
  }

  getAllListTeams(params: any) {
    this.util.getTeamsList(params).subscribe((teams: any) => {
      this.teamsList = teams.content.reverse();
      console.log('que trae teams', this.teamsList);
    });
  }
}
