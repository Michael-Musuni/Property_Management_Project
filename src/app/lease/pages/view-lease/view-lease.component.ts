import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LeaseComponent } from '../lease/lease.component';


@Component({
  selector: 'app-view-lease',
  templateUrl: './view-lease.component.html',
  styleUrls: ['./view-lease.component.sass']
})
export class ViewLeaseComponent implements OnInit  {
  lease: any;

  constructor(
    public dialogRef: MatDialogRef<LeaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    
  }

  ngOnInit(): void {
    this.lease = this.data;
    console.log("data", this.lease)
  }

closeDialog(): void {
  this.dialogRef.close();
}
}