import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { BillingService } from '../../billing.service';
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
    public dialog: MatDialog
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
          // Optionally, handle success (e.g., show a success message, navigate away, etc.)
        },
        (error) => {
          console.error('Error uploading file', error);
          // Optionally, handle error (e.g., show an error message)
        }
      );
    } else {
      console.error('No file selected');
      // Optionally, show an error message to the user
    }
  }

  // readExcel(file: File): void {
  //   const reader: FileReader = new FileReader();

  //   reader.onload = (e: any) => {
  //     const data: ArrayBuffer = e.target.result;
  //     const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'array' });
  //     const sheetName: string = workbook.SheetNames[0];
  //     const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      
  //     // Convert excel data to JSON
  //     const excelData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });

  //     // Remove the header row
  //     if (excelData.length > 0) {
  //       excelData.shift(); // Remove the first row
  //     }

  //     this.dataSource = new MatTableDataSource<any>(excelData)
  //     console.log("data received from excel",excelData);

  //     this.patchFormArray(excelData)
      
  //   };

  //   reader.readAsArrayBuffer(file);
  // }
  // patchFormArray(excelData: any[]) {
  //   throw new Error('Method not implemented.');
  // }

 

 
 

}
