import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { BillingService } from '../../billing.service';
import { InvoicesComponent } from '../invoices/invoices.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import * as XLSX from 'xlsx';

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
  loading: boolean = false;
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
      currentReadings: this.fb.array([])
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
        this.populateCurrentReadingsControl();
        console.log('Units:', this.units);
      } else {
        console.log('Units data is not available.');
      }
    });
  }

  populateCurrentReadingsControl() {
    const currentReadingsControl = this.uploadForm.get('currentReadings') as FormArray;
    this.units.forEach(unit => {
      currentReadingsControl.push(this.fb.control(unit.currentReadings || 0));
    });
  }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.populateCurrentReadings(data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  populateCurrentReadings(data: any[]): void {
    const currentReadingsControl = this.uploadForm.get('currentReadings') as FormArray;

    data.forEach((row, index) => {
      if (index === 0) return; // Skip header row
      const unitName = row[0];
      const currentReading = row[1];

      const unitIndex = this.units.findIndex(unit => unit.unitName === unitName);
      if (unitIndex !== -1) {
        // Assuming units and currentReadingsControl have the same length and order
        const control = currentReadingsControl.at(unitIndex);
        control.setValue(currentReading);
      }
    });
  }

  submitForm(): void {
    if (this.uploadForm.valid) {
      const formData = this.uploadForm.value;
      console.log('Form Data:', formData);
      this.loading = true;

      // Simulating server delay
      setTimeout(() => {
        this.uploadForm.reset();
        this.loading = false;
        this.snackbar.openSnackBar('Bill uploaded successfully!', 'Close');
      }, 2000);
    } else {
      this.uploadForm.markAllAsTouched();
    }
  }
}
