import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { BillingService } from '../../billing.service';
import { InvoicesComponent } from '../invoices/invoices.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';

interface Unit {
  unitName: string;
  previousReadings: number;
  costPerUnit: number;
  currentReadings: number;
  totalCost: number;
  totalUnits: number;
}

@Component({
  selector: 'app-upload-bill',
  templateUrl: './upload-bill.component.html',
  styleUrls: ['./upload-bill.component.scss']
})
export class UploadBillComponent implements OnInit {
  dialogData: any;
  uploadForm: FormGroup;
  loading: boolean;
  selectedFile: File | null = null;
  units: Unit[] = [];
  property: any;
  dataSource: MatTableDataSource<Unit>;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private billingService: BillingService,
    public dialogRef: MatDialogRef<InvoicesComponent>,
    private snackbar: SnackbarService
  ) {
    this.uploadForm = this.fb.group({
      propertyName: ["", Validators.required],
      propertyId: [""],
      uploadDate: [''],
      currentReadings: ['']
      
    });
    this.dataSource = new MatTableDataSource<Unit>([]);
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
    const dialogRef = this.dialog.open(PropertyLookupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.dialogData = result;
      this.property = this.dialogData.data.propertyName;
      this.uploadForm.get('propertyName').setValue(this.property);
      this.uploadForm.get('propertyId').setValue(this.dialogData.data.id);
      if (this.dialogData.data.units) {
        this.units = this.dialogData.data.units;
        this.dataSource.data = this.units;
        console.log('Units:', this.units);
      } else {
        console.log('Units data is not available.');
      }
    });
  }

  submitForm(): void {
    if (this.uploadForm.valid) {
      const formData = this.uploadForm.value;
      console.log('Form Data:', formData);
      this.loading = true;

      setTimeout(() => {
        this.uploadForm.reset();
        this.loading = false;
      }, 2000);
    } else {
      this.uploadForm.markAllAsTouched();
    }
  }

  onUpload(): void {
    this.loading = true;
    console.log('Property Selected is:', this.uploadForm.value.propertyId);
    console.log('Date Selected is:', this.selectedDate);

    if (this.selectedFile) {
      this.billingService.uploadFile(this.selectedFile, this.uploadForm.value.propertyId, this.selectedDate)
        .subscribe(
          response => {
            this.loading = false;
            console.log('File uploaded successfully:', response);
            this.snackbar.showNotification("snackbar-success", response.message);
            this.dialog.closeAll();
          },
          error => {
            this.snackbar.showNotification("snackbar-success", "Error in file upload");
          }
        );
    } else {
      this.snackbar.showNotification("snackbar-danger", "No file selected");
    }
  }

  // months: Month[] = [
  //   { value: 1, viewValue: 'January' },
  //   { value: 2, viewValue: 'February' },
  //   { value: 3, viewValue: 'March' },
  //   { value: 4, viewValue: 'April' },
  //   { value: 5, viewValue: 'May' },
  //   { value: 6, viewValue: 'June' },
  //   { value: 7, viewValue: 'July' },
  //   { value: 8, viewValue: 'August' },
  //   { value: 9, viewValue: 'September' },
  //   { value: 10, viewValue: 'October' },
  //   { value: 11, viewValue: 'November' },
  //   { value: 12, viewValue: 'December' }
  // ];

  selectedDate: number;
}
