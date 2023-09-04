import { AfterViewInit, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule, DatePipe, JsonPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailEditComponent } from './detail-edit/detail-edit.component';
import { DeleteTeamConfirmComponent } from './delete-team-confirm/delete-team-confirm.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface RowDataTable {
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

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    RouterLink,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    MatNativeDateModule
  ],
})
export class TableComponent implements AfterViewInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  notEditOrRemove = true;
  selectedRow: any;
  rangeDate!: string;
  showResetFilterBtn = false;
  @Input() dataTable: RowDataTable[] = [];

  @Output() selfDateFilter = new EventEmitter<string>();
  @Output() CleaerDateFilter = new EventEmitter<string>();

  displayedColumns: string[] = [
    'select',
    'id',
    'nombre',
    'estadio',
    'sitioWeb',
    'nacionalidad',
    'fundacion',
    'entrenador',
    'capacidad',
    'valor'
  ];
  dataSource = new MatTableDataSource<RowDataTable>();
  selection = new SelectionModel<RowDataTable>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog) {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: RowDataTable): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id
    }`;
  }

  checkBoxSelected(row: RowDataTable) {
    this.selectedRow = row;
    console.log(this.selectedRow);
  }

  ngOnInit(): void {
    //this.dataSource.data = this.dataTable;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  editSelect(obj:any): void {
    console.log(obj)
    const dialogRef = this.dialog.open(DetailEditComponent, {
      data: obj[0],
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      //this.animal = result;
    });
  }

  deleteSelect(obj:any): void {
    console.log(obj)
    const dialogRef = this.dialog.open(DeleteTeamConfirmComponent, {
      data: obj[0],
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      //this.animal = result;
    });
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    //console.log(dateRangeStart.value);
    //console.log(dateRangeEnd.value);

    let datePipe = new DatePipe('en-US');
    let firstDate = datePipe.transform(dateRangeStart.value, 'dd-MM-yyyy');
    let secondDate = datePipe.transform(dateRangeEnd.value, 'dd-MM-yyyy');

    if(firstDate?.length != 0&& secondDate?.length != 0) {
      this.selfDateFilter.emit(JSON.stringify({'firstDate': firstDate, 'secondDate': secondDate }));
      this.showResetFilterBtn = true
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dataTable) { // also add this check
      //console.log('Input data changed:', this.dataTable);
      this.dataSource.data = this.dataTable;
    }
  }

  filterClear(){
    this.CleaerDateFilter.emit('resetFilter')
    this.showResetFilterBtn = false
  }

}
