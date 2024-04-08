import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmenitiesService } from '../../services/amenities.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AmenitiesComponent } from '../amenities/amenities.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-amenities',
  templateUrl: './add-amenities.component.html',
  styleUrls: ['./add-amenities.component.sass']
})
export class AddAmenitiesComponent implements OnInit {

  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
  data:any




  constructor(private formBuilder: FormBuilder, private amenitiesService: AmenitiesService,private snackbar:SnackbarService,
    public dialogRef: MatDialogRef<AmenitiesComponent>,
    ) { }

  ngOnInit(): void {
    this.amenityForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      vat: ['', Validators.required],
    }); 
  }
   // Method to add amenity
   addAmenity() {
      console.log(this.amenityForm.value)
      this.amenitiesService.addAmenities(this.amenityForm.value).subscribe(
        (res) => {
          this.loading = false;
          this.data=res
          this.snackbar.showNotification("snackbar-success", this.data.message);
          this.amenityForm.reset();
          this.dialogRef.close();
        },
        (err) => {
          this.loading = false;
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
    
  }

  // Method to update amenity
  updateAmenity(amenity: any) {
    // Implement update logic here
  }

  // Method to delete amenity
  deleteAmenity(amenity: any) {
    const index = this.submittedAmenities.indexOf(amenity);
    if (index !== -1) {
      this.submittedAmenities.splice(index, 1);
    }
  }

  // Method to clear form
  clearForm() {
    this.amenityForm.reset();
  }
  public getAmenities(){

    // this.amenitiesService.getAmenities()
  }
}


