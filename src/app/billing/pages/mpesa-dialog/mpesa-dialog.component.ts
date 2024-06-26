import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { BillingService } from '../../billing.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
@Component({
  selector: 'app-mpesa-dialog',
  templateUrl: './mpesa-dialog.component.html',
  styleUrls: ['./mpesa-dialog.component.sass']
})
export class MpesaDialogComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  private uploadedFile: File | null = null;

  constructor(
    private billingService: BillingService,
    private http: HttpClient,
    private router: Router,
    public dialogRef: MatDialogRef<MpesaDialogComponent>,
    public dialog: MatDialog,
    private snackbar: SnackbarService,
  ){

  }


  ngOnInit(): void {
   
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFile = file;
      console.log('File selected:', this.uploadedFile);
      // Optionally, display a success message or any other UI indication
    }
  }

  completePayment(): void {
    if (this.uploadedFile) {
        this.billingService.uploadFile(this.uploadedFile).subscribe(
            (response) => {
                console.log('File successfully uploaded', response);
                // Handle success: show a success notification
                this.snackbar.showNotification("snackbar-success", "SUCCESSFUL DONE!");
                // Close the dialog
                this.dialogRef.close();
            },
            (error) => {
                console.error('Error uploading file', error);
                this.snackbar.showNotification("snackbar-success", "Error uploading file");
                // Close the dialog (if you want to close on error too, otherwise remove this line)
                this.dialogRef.close();
            }
        );
    } else {
        console.error('No file selected');
        // Handle case where no file is selected: show an error notification
        this.snackbar.showNotification("snackbar-success", "No file selected");
        // Close the dialog
        this.dialogRef.close();
    }
    
}

 

}
