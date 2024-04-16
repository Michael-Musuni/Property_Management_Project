// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { LeaseComponent } from '../lease/lease.component';
// import { LeaseService } from '../../service/lease.service';
// import { SnackbarService } from 'src/app/shared/services/snackbar.service';

// @Component({
//   selector: 'app-delete-lease',
//   templateUrl: './delete-lease.component.html',
//   styleUrls: ['./delete-lease.component.sass']
// })
// export class DeleteLeaseComponent implements OnInit {

//   rowdata: any;
//   color: any;
//   subscription: any;
//   isloading: boolean;

//   constructor(public dialogRef: MatDialogRef<LeaseComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private leaseService: LeaseService,
//     private snackbar: SnackbarService) { }

//   ngOnInit(): void {

//     this.rowdata = this.data;
//     console.log("Data", this.rowdata);
//   }

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
    
//     // this.subscription = this.leaseService.deleteContracts(this.data.customer.id)
//     // .subscribe((res)=> {
//     //   this.isloading = false;
//     //   this.snackbar.showNotification("snackbar-success", "Successful!");
//     //   this.dialogRef.close();
//     // },
//       error: ((error) => {

//         this.snackbar.showNotification(error, this.color);
//         console.log("Error", error)
//         this.dialogRef.close();
//       }),
//       complete: (() => { })
//     })
//   }

// }
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { LeaseService } from '../../service/lease.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete-lease.component.html',
  styleUrls: ['./delete-lease.component.sass']
})
export class DeleteComponent implements OnInit {
  isloading: boolean = false
  subscription: any;
rowdata: any;

  constructor(
    private snackbar: SnackbarService,
    private leaseService: LeaseService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

  }
  
  onDelete(){
    
    this.subscription = this.leaseService.deleteContracts(this.data.customer.id)
    .subscribe((res)=> {
      this.isloading = false;
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
