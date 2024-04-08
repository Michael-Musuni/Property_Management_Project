import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { BillingService } from '../../billing.service';
import { ExpensesService } from 'src/app/property/expenses.service';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PropertyService } from 'src/app/property/services/property.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-expenses',
  templateUrl: './add-expenses.component.html',
  styleUrls: ['./add-expenses.component.sass']
})
export class AddExpensesComponent implements OnInit {
  subscription!: Subscription;
  expensesForm: FormGroup;
  loading: boolean = false;
  submissionStatus: string = '';
  dialogData: any
  selectedValue: any
  units: any;
  idFile: any
  imageSrc: string;
  id: string | ArrayBuffer;
  expensesData: any;
property: any;


  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private billing: BillingService,

    private expenses: ExpensesService,

    private router: Router,
    private dialog: MatDialog,
    private propertyService: PropertyService,
    public dialogRef: MatDialogRef<AddExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ) { }

  ngOnInit(): void {
    this.expensesForm = this.fb.group({
      expenseName: ['', [Validators.required]],

      dateOccurred: ['', [Validators.required]],
      amount: [''],
      category: [''],
      description: ['', [Validators.required]],
      vendor: [''],
      createdDate: ['', ],
      createdBy: ['', [Validators.required]],
      status: ['', [Validators.required]],
      propertyId: [''],
      unitId: [''],

      file:  ['', ],
        });
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.["string"];

    // Update the 'fileUpload' form control value
    this.expensesForm.patchValue({
      file: file,
    });

    // ... other logic
  }
  onIDChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.idFile = reader.result;
        this.expensesForm.controls.file.setValue(this.idFile);
        this.imageSrc = reader.result as string;
        this.id = reader.result;
      }
      reader.onerror = (error) => {
        console.log(error)
      }
    }
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
      this.expensesForm.patchValue({
        property: this.dialogData.data,
        propertyId: this.dialogData.data.id,
        propertyName: this.dialogData.data.propertyName,
      });

    if (this.dialogData.data.units) {
        this.units = this.dialogData.data.units;
        console.log('Units:', this.units);
    } else {
        console.log('Units data is not available.');
    }
});


  }
  onUnitChange(event: any): void { 
    this.selectedValue = event.value;
    console.log('Selected Unit:', this.selectedValue);
    this.expensesForm.patchValue({
      unitId: this.selectedValue
    });
  }
  
    onSubmit() {

      this.loading = true;
          this.billing.onSubmit(this.expensesForm.value).subscribe({
            next: (response) => {
              console.log('Response:', response);
              // Add logic to handle successful submission here, e.g., showing a success message
              this.submissionStatus = response.message;
              this.snackbar.showNotification("snackbar-success", response.message);
              this.router.navigate(['/billing/main'])
            },
            error: (error) => {
              console.error('Error occurred:', error);
              // Add logic to handle errors, e.g., showing an error message to the user
              this.submissionStatus = error;
              this.snackbar.showNotification("snackbar-danger", error);
        },
        complete: () => {
          this.loading = false; 
        }

      });
    

        error: (error) => {
          console.error('Error occurred:', error);
          // Add logic to handle errors, e.g., showing an error message to the user
          this.submissionStatus = error;
          this.snackbar.showNotification("snackbar-danger", error);
        }

    }
    closeDialog(): void {
      this.dialogRef.close();
    }
  }

