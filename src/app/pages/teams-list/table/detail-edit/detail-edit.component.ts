import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import { UtilService } from 'src/app/services/util.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

export interface DialogData {
  capacidad: number;
  entrenador: string;
  estadio: string;
  fundacion: string;
  id: number;
  nacionalidad: string;
  nombre: string;
  sitioWeb: string;
  valor: string | number | null;
}

@Component({
  selector: 'app-detail-edit',
  templateUrl: './detail-edit.component.html',
  styleUrls: ['./detail-edit.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
})
export class DetailEditComponent {

  teamEdit!: FormGroup

  constructor(
    public dialogRef: MatDialogRef<DetailEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public fb: FormBuilder, public utilService: UtilService
  ) {}

  ngOnInit() {
    this.teamEdit = this.fb.group({
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  teamUpdate() {
    let date = this.teamEdit.controls['fundacion'].value
    console.log(new Date(date).toISOString());
    let objSelf = {
      "id": this.data.id,
      "nombre": this.teamEdit.controls['teamName'].value,
      "estadio": this.teamEdit.controls['teamStadium'].value,
      "sitioWeb": this.teamEdit.controls['webSite'].value,
      "nacionalidad": this.teamEdit.controls['nationality'].value,
      "fundacion": new Date(date).toISOString(),
      "entrenador": this.teamEdit.controls['trainer'].value,
      "capacidad": this.teamEdit.controls['capacity'].value,
      "valor": this.teamEdit.controls['value'].value,
    };

    console.log(objSelf)

    this.utilService
      .updateTeam(this.data.id, objSelf)
      .subscribe((res: any) => {
        console.log('respuesta despues de crear', res);
        this.dialogRef.close(res);
      });
  }
}
