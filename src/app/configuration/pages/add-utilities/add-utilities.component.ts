import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmenitiesService } from '../../services/amenities.service';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilitiesComponent } from '../utilities/utilities.component';
import { UtilitiesService } from '../../services/utilities.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-add-utilities',
  templateUrl: './add-utilities.component.html',
  styleUrls: ['./add-utilities.component.sass']
})
export class AddUtilitiesComponent implements OnInit {

  utilityForm: FormGroup;
  submittedUtilities: any[] = []; // Define submitted utilities array
  loading:boolean
  
  constructor(private formBuilder: FormBuilder, private utilitiesService: UtilitiesService,private snackbar:SnackbarService,
    public dialogRef: MatDialogRef<UtilitiesComponent>,
    ) { }
  ngOnInit(): void {
    this.utilityForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      

    });
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
  this.utilityForm.patchValue(JSON.parse(savedFormData));
    }
  this.utilityForm.valueChanges.subscribe(value => {
      localStorage.setItem('formData', JSON.stringify(value));
    });
  }


  // clearFormStorage() {
  //   localStorage.removeItem('formData');
  //   this.utilityForm.reset(); // Optionally reset the form fields
  // }
  
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


