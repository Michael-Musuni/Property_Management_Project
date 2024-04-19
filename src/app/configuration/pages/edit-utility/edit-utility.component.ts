import { Component, Inject, OnInit } from '@angular/core';
import { UtilitiesComponent } from '../utilities/utilities.component';
import { UtilitiesService } from '../../services/utilities.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-edit-utility',
  templateUrl: './edit-utility.component.html',
  styleUrls: ['./edit-utility.component.sass']
})
export class EditUtilityComponent implements OnInit {

  utilityForm: FormGroup;
  submittedAmenities: any[] = []; // Define submitted amenities array
  loading:boolean
constructor(
  private fb: FormBuilder,
  private formBuilder: FormBuilder, 
  private utilitiesService: UtilitiesService,
  private snackbar:SnackbarService,
  public dialogRef: MatDialogRef<UtilitiesComponent>,
  @Inject(MAT_DIALOG_DATA) private data :any
    ) { }

  ngOnInit(): void {
    this.utilityForm=this.utilityDetails()
     console.log("this data"+this.data.customer.description,)
     console.log(this.utilityForm)
    }
    utilityDetails(): FormGroup {
    return this.fb.group({
     id:[this.data.customer.id, [Validators.required]],
      name: [this.data.customer.name, [Validators.required]],
      description: [this.data.customer.description, [Validators.required]],
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
