import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-rent',
  templateUrl: './view-rent.component.html',
  styleUrls: ['./view-rent.component.sass']
})
export class ViewRentComponent {
  rent: any;

  constructor(
    public dialogRef: MatDialogRef<ViewRentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.rent = data.rent;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
