import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-send-options-dialog',
  templateUrl: './send-options-dialog.component.html',
  styleUrls: ['./send-options-dialog.component.sass']
})
export class SendOptionsDialogComponent implements OnInit {
  selectedMethod: string;

  constructor(public dialogRef: MatDialogRef<SendOptionsDialogComponent>) {}

  ngOnInit(): void {
    this.selectedMethod = ''; // Initialize the selected method
  }

  onCancelClick(): void {
    this.dialogRef.close(); // Close the dialog without sending
  }
}
