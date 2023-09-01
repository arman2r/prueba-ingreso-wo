import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DialogData } from '../detail-edit/detail-edit.component';
import { UtilService } from 'src/app/services/util.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-team-confirm',
  standalone: true,
  templateUrl: './delete-team-confirm.component.html',
  styleUrls: ['./delete-team-confirm.component.scss'],
  imports: [MatDialogModule, MatIconModule, MatButtonModule]
})
export class DeleteTeamConfirmComponent {

  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DeleteTeamConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public utilService: UtilService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm() {
    this.utilService.deleteTeam(this.data.id)
    .subscribe((res: any) => {
      console.log('respuesta despues de eliminar', res);
      this.dialogRef.close('equipo eliminado');
      this.close.emit(null);
    });
  }
}
