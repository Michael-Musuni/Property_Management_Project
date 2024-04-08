import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-expenses',
  templateUrl: './view-expenses.component.html',
  styleUrls: ['./view-expenses.component.sass']
})
export class ViewExpensesComponent  {

  row: any;

  constructor(
    public dialogRef: MatDialogRef<ViewExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    this.row = data.row;
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
