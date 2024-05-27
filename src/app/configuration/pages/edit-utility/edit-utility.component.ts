import { Component, Inject, OnInit } from '@angular/core';
import { UtilitiesComponent } from '../utilities/utilities.component';
import { UtilitiesService } from '../../services/utilities.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';

@Component({
  selector: 'app-edit-utility',
  templateUrl: './edit-utility.component.html',
  styleUrls: ['./edit-utility.component.sass']
})
export class EditUtilityComponent implements OnInit {

  utilityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
  dialogData: any;
constructor(
  private fb: FormBuilder,
  private formBuilder: FormBuilder, public dialog: MatDialog,
  private utilitiesService: UtilitiesService,
  private snackbar:SnackbarService,
  public dialogRef: MatDialogRef<UtilitiesComponent>,
  @Inject(MAT_DIALOG_DATA) private data :any
    ) { }

  ngOnInit(): void {
    this.utilityForm=this.utilityDetails()
     console.log("this data"+this.data.customer.description,)
     console.log(this.utilityForm)
     this.utilityForm.valueChanges.subscribe(values => {
      this.calculateTotalAmount();
    });
    }
    utilityDetails(): FormGroup {
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
   // Method to update amenity
   editUtility() {
    this.loading = true;
    
    const body = {
      
    }
    this.utilitiesService.updateUtility(this.utilityForm.value.id,this.utilityForm.value, ).subscribe(
      (res) => {
        
        this.loading = false;
        this.snackbar.showNotification('snackbar-success', 'Utility information updated successfully!');
        this.utilityForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification('snackbar-danger', err);
      }
    );
  }
  clearForm() {
    this.utilityForm.reset();
  }
}
