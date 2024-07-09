import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { BillingService } from '../../billing.service';
import { InvoicesComponent } from '../invoices/invoices.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import * as XLSX from 'xlsx';
import { FileUploadService } from './readings_upload-service';

interface Unit {
  unitName: string;
  previousReading: number;
  value: number;
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
  file: File | null = null;
  dataFetched: boolean = false; // Property to track if data is fetched
  dataSelected: boolean = false; // Property to track if data is selected
  dataList: string[] = []; // Array to hold fetched data
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private billingService: BillingService,
    private fileUploadService: FileUploadService,
    public dialogRef: MatDialogRef<InvoicesComponent>,
    private snackbar: SnackbarService
  ) {
    this.uploadForm = this.fb.group({
      // propertyName: ["", Validators.required],
      leaseId: ["", Validators.required],
      // unitName: [""],
    
      // value:[""],
      // totalUnits:[''],
      // totalCost:[],
      // previousReading:[''],
    
      currentReadings: ["", Validators.required],
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
      console.log("Dialog result:", result.data.propertyName); 
      
      if (result && result.data.propertyName) { 
        const propertyName = result.data.propertyName;
        console.log("Selected propertyName:", propertyName); 
  
       
        this.billingService.getPropertyData(propertyName).subscribe(
          (response) => {
            this.units = response; 
            this.dataSource.data = this.units;
            console.log('Units:', this.units);
          },
          (error) => {
            console.error('Error fetching units:', error);
            this.units = []; 
          }
        );
  
        // Update form values based on selected property
        this.uploadForm.get('propertyName').setValue(result.data.propertyName);
        this.uploadForm.get('propertyId').setValue(result.data.id); // Assuming you also need propertyId
      } else {
        console.error('Selected propertyName is undefined:', result);
      }
    });
  
    setTimeout(() => {
      this.dataList = ['Property 1', 'Property 2', 'Property 3']; // Simulate fetched data
      this.dataFetched = true; // Set to true when data is fetched
    }, 1000);
  }
  
  
  onDataSelected(item: string) {
    console.log(`Selected item: ${item}`);
    this.dataSelected = true; // Set to true when data is selected
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
    console.log("File selected");
    this.uploadFile();
  }
  
  uploadFile() {
    if (this.file) {
      this.fileUploadService.readExcelFile(this.file).then((excelData) => {
        const transformedData = this.transformExcelData(excelData);
        this.updateReadings(transformedData);
      });
    }
  }
  
  transformExcelData(data: any[]): any[] {
    const [headers, ...rows] = data;
    return rows.map(row => {
      let obj: any = {};
      headers.forEach((header: string, index: number) => {
        obj[header] = row[index];
      });
      return obj;
    });
  }
  
get formLocation() {
  return this.uploadForm.get('Data') as FormArray;
}
  
  updateReadings(excelData: any[]) {
    console.log("Excel Data:", JSON.stringify(excelData));
    console.log("Before Update - DataSource Data:", JSON.stringify(this.dataSource.data));
  
    excelData.forEach((item: any) => {
      const existingUnit = this.dataSource.data.find(d => d.unitName === item.unitName);
      console.log(existingUnit)
      console.log(item)
      if (existingUnit) {
        
        existingUnit.currentReadings = item.currentReadings;
        
        existingUnit.totalUnits = existingUnit.currentReadings - existingUnit.previousReading;
        existingUnit.totalCost = existingUnit.totalUnits * existingUnit.value;
        var data = {currentReadings:item.currentReadings ,unitName: item.unitName }
        // this.formLocation.push(this.initLocations(data))
       
        this.uploadForm.get("currentReadings").patchValue(item.currentReadings);
        var data3 = existingUnit
        console.log(data3['id'])
        this.uploadForm.get("leaseId").patchValue(data3['id']);
        this.uploadForm.get("totalUnits").patchValue(existingUnit.totalUnits);
        this.uploadForm.get("totalCost").patchValue(existingUnit.totalCost);
        // this.uploadForm.get("previousReading").patchValue(existingUnit.previousReading);
        this.uploadForm.get("unitName").patchValue(existingUnit.unitName);
      } else {
        console.warn(`No existing unit found for unitName: ${item.unitName}`);
      }
    });
  
    console.log("After Update - DataSource Data:", JSON.stringify(this.dataSource.data));
    this.dataSource.data = [...this.dataSource.data];
    console.log(this.uploadForm)

  }

  initLocations(data:any | null){
    console.log(data)
    if(data != undefined && data != null){
      return this.fb.group({
        currentReadings:[data.currentReadings, Validators.required],
        unitName: data.unitName
      });
    }else{
      return this.fb.group({
        currentReadings:[null, Validators.required],
        unitName: [null],
        
      });
    }
  }
  
  submitForm(): void {
    if (this.uploadForm.valid) {
      const formData = this.uploadForm.value;
      console.log('Form Data:', formData);
      this.loading = true;

      this.billingService.submitBillingData(formData).subscribe(
        response => {
          console.log('Server response:', response);
          this.uploadForm.reset();
          this.loading = false;
          this.snackbar.open('Bill uploaded successfully!', 'Close', {
            duration: 3000,
          });
        },
        error => {
          console.error('Error:', error);
          this.loading = false;
          this.snackbar.open('Failed to upload bill. Please try again.', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.uploadForm.markAllAsTouched();
    }
  }
}
