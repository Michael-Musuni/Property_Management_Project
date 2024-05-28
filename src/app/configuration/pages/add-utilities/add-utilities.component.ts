import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UtilitiesComponent } from '../utilities/utilities.component';
import { UtilitiesService } from '../../services/utilities.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-add-utilities',
  templateUrl: './add-utilities.component.html',
  styleUrls: ['./add-utilities.component.sass']
})
export class AddUtilitiesComponent implements OnInit {

  utilityForm: FormGroup;
  submittedUtilities: any[] = []; // Define submitted utilities array
  loading:boolean
  
  dialogData: any;
  amenityForm: any;
  
  constructor(private formBuilder: FormBuilder,public dialog: MatDialog, private utilitiesService: UtilitiesService,private snackbar:SnackbarService,
    public dialogRef: MatDialogRef<UtilitiesComponent>,
    ) { }
  ngOnInit(): void {
    this.utilityForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [null, Validators.required],
      propertyName: [null, Validators.required],
      vat: [null],
      totalAmount: [{value: null, disabled: false}, Validators.required]
      

    });
    this.utilityForm.valueChanges.subscribe(values => {
      this.calculateTotalAmount();
    });
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
  this.utilityForm.patchValue(JSON.parse(savedFormData));
    }
  this.utilityForm.valueChanges.subscribe(value => {
      localStorage.setItem('formData', JSON.stringify(value));
    });
  }
  calculateTotalAmount(): void {
    const amount = parseFloat(this.utilityForm.get('amount')?.value);
    const vat = parseFloat(this.utilityForm.get('vat')?.value);

    if (!isNaN(amount)) {
      let totalAmount;
      if (!isNaN(vat)) {
        const vatAmount = (amount * vat) / 100;
        totalAmount = amount + vatAmount;
      } else {
        totalAmount = amount;
      }
      this.utilityForm.get('totalAmount')?.setValue(totalAmount.toFixed(2), { emitEvent: false });
    } else {
      this.utilityForm.get('totalAmount')?.setValue(null, { emitEvent: false });
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
      this.utilityForm.patchValue({
       
        propertyId: this.dialogData.data.id,
        propertyName: this.dialogData.data.propertyName,
       

      });
     

    });

  }
 
  
  addUtility() {if (this.utilityForm.valid) {
    console.log(this.utilityForm.value)
    this.utilitiesService.addUtilities 
      (this.utilityForm.value).subscribe(
      (res) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-success", "Successful!");
        this.utilityForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }


    if (this.utilityForm.valid) {
      console.log(this.utilityForm.value)
      // this.submittedUtilities.push(this.utilityForm.value);
      // this.clearForm();
    }
  }

  // Method to update utility
  updateUtility(utility: any) {
    // Implement update logic here
  }

  // Method to delete utility
  deleteUtility(utility: any) {
    const index = this.submittedUtilities.indexOf(utility);
    if (index !== -1) {
      this.submittedUtilities.splice(index, 1);
    }
  }

  // Method to clear form
  clearForm() {
    this.utilityForm.reset();
  }
  public getUtilities(){

    // this.amenitiesService.getAmenities()
  }




}


