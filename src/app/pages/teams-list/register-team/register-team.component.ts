import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UtilService } from 'src/app/services/util.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-register-team',
  standalone: true,
  templateUrl: './register-team.component.html',
  styleUrls: ['./register-team.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
})
export class RegisterTeamComponent {
  registerNewTeam!: FormGroup;

  constructor(public fb: FormBuilder, public utilService: UtilService) {}

  ngOnInit() {
    this.registerNewTeam = this.fb.group({
      teamName: ['', [Validators.required, Validators.minLength(2)]],
      teamStadium: ['', [Validators.required, Validators.minLength(2)]],
      webSite: ['', [Validators.required, Validators.minLength(2)]],
      nationality: ['', [Validators.required, Validators.minLength(2)]],
      fundacion: ['', [Validators.required, Validators.minLength(2)]],
      trainer: ['', [Validators.required, Validators.minLength(2)]],
      capacity: ['', [Validators.required, Validators.minLength(2)]],
      value: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  submitForm() {
    let date = this.registerNewTeam.controls['fundacion'].value
    console.log(new Date(date).toISOString());
    let objSelf = {
      "nombre": this.registerNewTeam.controls['teamName'].value,
      "estadio": this.registerNewTeam.controls['teamStadium'].value,
      "sitioWeb": this.registerNewTeam.controls['webSite'].value,
      "nacionalidad": this.registerNewTeam.controls['nationality'].value,
      "fundacion": new Date(date).toISOString(),
      "entrenador": this.registerNewTeam.controls['trainer'].value,
      "capacidad": this.registerNewTeam.controls['capacity'].value,
      "valor": this.registerNewTeam.controls['value'].value,
    };

    console.log(objSelf)

    this.utilService
      .setNewTeam(objSelf)
      .subscribe((res: any) => {
        console.log('respuesta despues de crear', res);
      });

  }
}
