import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LeaseComponent } from '../lease/lease.component';
import { LeaseService } from '../../service/lease.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-delete-lease',
  templateUrl: './delete-lease.component.html',
  styleUrls: ['./delete-lease.component.sass']
})
export class DeleteLeaseComponent implements OnInit {

  rowdata: any;
  color: any;

  constructor(public dialogRef: MatDialogRef<LeaseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private leaseService: LeaseService,
    private snackbar: SnackbarService) { }

  ngOnInit(): void {

    this.rowdata = this.data;
    console.log("Data", this.rowdata);
  }
  delete(): void {
    this.dialogRef.close('delete');
  }

//   onDelete() {

//     this.leaseService.deleteContracts(this.rowdata.data.id).subscribe({
//       next: ((response) => {

//         if (response.statusCode === 200) {
//           this.snackbar.showNotification(response.message, this.color);
//           console.log("response", response.entity);
//           this.dialogRef.close
//           this.leaseService.updateData();
//         }
//         this.snackbar.showNotification(response.message, this.color);
//         this.dialogRef.close

//       }),
//       error: ((error) => {

//         this.snackbar.showNotification(error, this.color);
//         console.log("Error", error)
//         this.dialogRef.close();
//       }),
//       complete: (() => { })
//     })
//   }

// }
onDelete(): void {
  this.leaseService.deleteContracts(this.rowdata.data.id).subscribe({
    next: (response) => {
      if (response.statusCode === 200) {
        this.snackbar.showNotification(response.message, this.color);
        console.log("Response", response.entity);
        this.dialogRef.close(); // Close the dialog upon successful deletion
        this.leaseService.updateData(); // Optionally update data after successful deletion
      } else {
        this.snackbar.showNotification(response.message, this.color);
      }
    },
    error: (error) => {
      this.snackbar.showNotification('An error occurred while deleting the contract.', this.color);
      console.log("Error", error);
      this.dialogRef.close(); // Close the dialog even if there's an error
    },
    complete: () => {
      // Optional: Perform cleanup or additional actions after completion
    }
  });
}
}