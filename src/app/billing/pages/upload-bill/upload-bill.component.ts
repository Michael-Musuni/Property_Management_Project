import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { BillingService } from '../../billing.service';
import { InvoicesComponent } from '../invoices/invoices.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';

interface Month {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-upload-bill',
  templateUrl: './upload-bill.component.html',
  styleUrls: ['./upload-bill.component.scss']
})
export class UploadBillComponent implements OnInit {
  dialogData:any
  uploadForm:FormGroup
  loading: boolean;
  selectedFile: File | null = null;
  
  constructor(
    private dialog: MatDialog,
    private fb:FormBuilder,
    private billingService:BillingService,
    public dialogRef: MatDialogRef<InvoicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar:SnackbarService
  ) { 
    this.uploadForm = this.fb.group({
      propertyName: ["", Validators.required],
      propertyId:["",Validators.required],
      month:['',Validators.required]
   });
  }

  ngOnInit(): void {
  }

  pickProperty() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      user: '',
    };
    const dialogRef = this.dialog.open(
      PropertyLookupComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.uploadForm.patchValue({
        propertyId:this.dialogData.data.id,
        propertyName: this.dialogData.data.propertyName,
       

      });
  

    });

  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }



  onUpload(): void {
    this.loading=true
    console.log('Property Selected is:', this.uploadForm.value.propertyId);
    console.log('Month Selected is:', this.selectedMonth);

    if (this.selectedFile) {
      this.billingService.uploadFile(this.selectedFile,this.uploadForm.value.propertyId,this.selectedMonth)
        .subscribe(
          response => {
            this.loading=false
            console.log('File uploaded successfully:', response);
            this.snackbar.showNotification("snackbar-success", response.message);
            this.dialog.closeAll()
          },
          error => {
            this.snackbar.showNotification("snackbar-success","Error in file upload");
       
          }
          
        );
    } else {
    
      this.snackbar.showNotification("snackbar-danger", "No file selected");
      // Handle no file selected
    }
    
  }
  months: Month[] = [
    { value: 1, viewValue: 'January' },
    { value: 2, viewValue: 'February' },
    { value: 3, viewValue: 'March' },
    { value: 4, viewValue: 'April' },
    { value: 5, viewValue: 'May' },
    { value: 6, viewValue: 'June' },
    { value: 7, viewValue: 'July' },
    { value: 8, viewValue: 'August' },
    { value: 9, viewValue: 'September' },
    { value: 10, viewValue: 'October' },
    { value: 11, viewValue: 'November' },
    { value: 12, viewValue: 'December' }
  ];

  selectedMonth: number;
}
