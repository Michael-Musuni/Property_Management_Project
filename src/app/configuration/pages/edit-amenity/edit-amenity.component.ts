import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AmenitiesService } from '../../services/amenities.service';
import { AmenitiesComponent } from '../amenities/amenities.component';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';

@Component({
  selector: 'app-edit-amenity',
  templateUrl: './edit-amenity.component.html',
  styleUrls: ['./edit-amenity.component.sass']
})
export class EditAmenityComponent implements OnInit {

  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
  dialogData: any;
constructor(
  private fb: FormBuilder,
  private formBuilder: FormBuilder, public dialog: MatDialog, 
  private amenitiesService: AmenitiesService,
  private snackbar:SnackbarService,
  public dialogRef: MatDialogRef<AmenitiesComponent>,
  @Inject(MAT_DIALOG_DATA) private data :any
    ) { }

  ngOnInit(): void {
    this.amenityForm=this.amenityDetails()
     console.log("this data"+this.data.customer)
     this.amenityForm.valueChanges.subscribe(values => {
      this.calculateTotalAmount();
    });
    }
amenityDetails(): FormGroup {
    return this.fb.group({
      id: [this.data.customer.id, [Validators.required]],
      name: [this.data.customer.name, [Validators.required]],
      totalAmount: [this.data.customer.totalAmount, [Validators.required]],
      amount: [this.data.customer.amount, [Validators.required]],
      propertyName: [this.data.customer.propertyName],
      vat: [this.data.customer.vat],
    });
    
  }
  calculateTotalAmount(): void {
    const amount = parseFloat(this.amenityForm.get('amount')?.value);
    const vat = parseFloat(this.amenityForm.get('vat')?.value);

    if (!isNaN(amount)) {
      let totalAmount;
      if (!isNaN(vat)) {
        const vatAmount = (amount * vat) / 100;
        totalAmount = amount + vatAmount;
      } else {
        totalAmount = amount;
      }
      this.amenityForm.get('totalAmount')?.setValue(totalAmount.toFixed(2), { emitEvent: false });
    } else {
      this.amenityForm.get('totalAmount')?.setValue(null, { emitEvent: false });
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
      this.amenityForm.patchValue({
       
        propertyId: this.dialogData.data.id,
        propertyName: this.dialogData.data.propertyName,
       

      });
     

    });

  }
   // Method to update amenity
   editAmenity() {
    this.loading = true;
    
    const body = {
      
    }
    this.amenitiesService.updateAmenity(this.amenityForm.value.id,this.amenityForm.value, ).subscribe(
      (res) => {
        
        this.loading = false;
        this.snackbar.showNotification('snackbar-success', 'Amenity information updated successfully!');
        this.amenityForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification('snackbar-danger', err);
      }
    );
  }
  clearForm() {
    this.amenityForm.reset();
  }
}
 
 



