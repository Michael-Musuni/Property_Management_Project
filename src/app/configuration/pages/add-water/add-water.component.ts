import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AmenitiesService } from '../../services/amenities.service';
import { AmenitiesComponent } from '../amenities/amenities.component';

@Component({
  selector: 'app-add-water',
  templateUrl: './add-water.component.html',
  styleUrls: ['./add-water.component.sass']
})
export class AddWaterComponent implements OnInit {

  amenityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
  data:any
  dialogData: any;
  units: any;
constructor(
  private formBuilder: FormBuilder, public dialog: MatDialog, 
  private amenitiesService: AmenitiesService,
  private snackbar:SnackbarService,
  public dialogRef: MatDialogRef<AmenitiesComponent>,
    ) { }

  ngOnInit(): void {
    this.amenityForm = this.formBuilder.group({
      amountType: [null, Validators.required],
      amountValue: [null, Validators.required],
      propertyName: [null, Validators.required],
    
     
    });
    this.amenityForm.valueChanges.subscribe(values => {
     
    }); 
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
  this.amenityForm.patchValue(JSON.parse(savedFormData));
    }
  this.amenityForm.valueChanges.subscribe(value => {
      localStorage.setItem('formData', JSON.stringify(value));
    });
  }
 
  
   addAmenity() {
      console.log(this.amenityForm.value)
      this.amenitiesService.addWaters(this.amenityForm.value).subscribe(
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
  getUnitsPerProperty(arg0: string, id: any): any {
    throw new Error('Method not implemented.');
  }
  getChargesPerProperty(id: any) {
    throw new Error('Method not implemented.');
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
