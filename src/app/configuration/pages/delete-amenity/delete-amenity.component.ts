import { Component, Inject, OnInit } from '@angular/core';
import { AmenitiesComponent } from '../amenities/amenities.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { AmenitiesService } from '../../services/amenities.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delete-amenity',
  templateUrl: './delete-amenity.component.html',
  styleUrls: ['./delete-amenity.component.sass']
})
export class DeleteAmenityComponent implements OnInit {

  

  amenityForm: FormGroup;
  isloading: boolean = false

  subscription: Subscription

  constructor(
    public dialogRef: MatDialogRef<AmenitiesComponent>,
    @Inject(MAT_DIALOG_DATA) private data :any,
    private snackbar: SnackbarService,
    private amenitiesService: AmenitiesService,
  ) { }

  ngOnInit(): void {
    this.amenityForm = this.data.amenityForm;
  }

  onDelete(){
   
    this.subscription = this.amenitiesService.deleteAmenity(this.data.customer.id)
    .subscribe((res)=> {
      this.isloading = true;
      this.snackbar.showNotification("snackbar-success", "Successful!");
      this.dialogRef.close();
      
    },
    (err)=> {
      this.isloading = false;
      this.snackbar.showNotification("snackbar-danger", err);
      this.dialogRef.close();
    })
  }

  onCancel(){
    this.dialogRef.close()
  }
}
