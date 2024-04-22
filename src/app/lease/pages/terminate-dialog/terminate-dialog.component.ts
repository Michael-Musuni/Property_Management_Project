import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms'; // Import if using form validation
import { MatFormField } from '@angular/material/form-field';
import { LeaseComponent } from '../lease/lease.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LeaseService } from '../../service/lease.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-terminate-dialog.component',
  templateUrl: './terminate-dialog.component.html',
  styleUrls: ['./terminate-dialog.component.sass']
})
export class TerminateDialogComponent {
  leaseService: any;
  snackbar: any;
  color: any;
  onNoChecked(): void {
    this.noChecked = true;
    this.yesChecked = false;
  }
  onYesChecked(): void {
    this.yesChecked = true;
    this.noChecked = false;
  }
  toggleNoChecked() {
    throw new Error('Method not implemented.');
  }
  yesChecked: any;
  noChecked: any;
  toggleYesChecked() {
    throw new Error('Method not implemented.');
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

  descriptionFormControl = new FormControl('', Validators.required); // Form control for description field
  rowdata: any;

  constructor(
    public dialogRef: MatDialogRef<TerminateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  // onTerminate(): void {
  //   if (this.descriptionFormControl.valid) {
  //     // Perform termination logic here (e.g., call API to terminate contract)
  //     console.log('Terminating contract for:', this.rowdata.data.id);
  //     console.log('Description:', this.descriptionFormControl.value);

  //     // Close the dialog upon successful termination
  //     this.dialogRef.close();
  //   } else {
  //     // Display error message or handle invalid form state
  //     console.log('Invalid form data');
  //   }
  // }
  onTerminate() {
    this.leaseService.terminatedContracts(this.rowdata.data.id).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.snackbar.showNotification(response.message, this.color);
          console.log("Response", response.entity);
          this.dialogRef.close(); // Close the dialog upon successful deletion
          this.leaseService.updateData(); // Optionally update data after successful deletion
        } else {
          this.snackbar.showNotification(response.message, this.color);
        }
      }

    })   
  }
}
