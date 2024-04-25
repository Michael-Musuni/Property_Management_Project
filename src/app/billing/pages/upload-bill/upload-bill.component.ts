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

  

  selectedDate: number;
}
