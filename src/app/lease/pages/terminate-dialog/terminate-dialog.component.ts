import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { LeaseService } from '../../service/lease.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-terminate-dialog',
  templateUrl: './terminate-dialog.component.html',
  styleUrls: ['./terminate-dialog.component.sass']
})
export class TerminateDialogComponent implements OnInit {
  descriptionFormControl = new FormControl('', Validators.required);
  rowdata: any;
  yesChecked: any;
  noChecked: any;
  subscription: any;
  color: any;
  terminationReason: any;
  tenantName = ''
 
  
    terminate(): void {
      this.dialogRef.close('Contract terminated successfully!');
    }

  constructor(
    public dialogRef: MatDialogRef<TerminateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private leaseService: LeaseService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.tenantName = this.data.tenantName
    // Initialization tasks can be performed here
    console.log('TerminateDialogComponent initialized', this.data.tenantName);
  }

  onNoChecked(): void {
    this.noChecked = true;
    this.yesChecked = false;
  }
  onYesChecked(): void {
    this.yesChecked = true;
    this.noChecked = false;
  }

 

  onTerminate(contractId: any): void {
    this.leaseService.terminateContract(contractId).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.snackbar.showNotification(response.message, 'success');
          this.dialogRef.close(); // Close the dialog upon successful termination
          this.leaseService.updateData(); // Optionally update data after successful termination
        } else {
          this.snackbar.showNotification(response.message, 'error');
        }
      },
      error: (error) => {
        console.error('Error terminating contract:', error);
        this.snackbar.showNotification('An error occurred during termination', 'error');
      }
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
