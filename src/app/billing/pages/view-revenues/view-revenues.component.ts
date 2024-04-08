import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-revenues',
  templateUrl: './view-revenues.component.html',
  styleUrls: ['./view-revenues.component.sass']
})
export class ViewRevenuesComponent{
  revenue: any;

  constructor(
    public dialogRef: MatDialogRef<ViewRevenuesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    this.revenue = data.revenue;
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
