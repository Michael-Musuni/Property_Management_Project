import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AmenitiesService } from '../../services/amenities.service';
import { AmenitiesComponent } from '../amenities/amenities.component';

@Component({
  selector: 'app-edit-amenity',
  templateUrl: './edit-amenity.component.html',
  styleUrls: ['./edit-amenity.component.sass']
})
export class EditAmenityComponent implements OnInit {

  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
constructor(
  private fb: FormBuilder,
  private formBuilder: FormBuilder, 
  private amenitiesService: AmenitiesService,
  private snackbar:SnackbarService,
  public dialogRef: MatDialogRef<AmenitiesComponent>,
  @Inject(MAT_DIALOG_DATA) private data :any
    ) { }

  ngOnInit(): void {
    this.amenityForm=this.amenityDetails()
     console.log("this data"+this.data.customer)
    }
amenityDetails(): FormGroup {
    return this.fb.group({
      id: [this.data.customer.id, [Validators.required]],
      name: [this.data.customer.name, [Validators.required]],
      description: [this.data.customer.description, [Validators.required]],
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
 
 



