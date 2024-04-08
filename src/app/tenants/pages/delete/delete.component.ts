import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TenantService } from '../tenant.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/shared/snackbar.service';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.sass']
})
export class DeleteComponent implements OnInit {
  isloading: boolean = false
  subscription: any;

  constructor(
    private snackbar: SnackbarService,
    private tenantService: TenantService,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {

  }
  
  onDelete(){
    
    this.subscription = this.tenantService.deleteTenant(this.data.customer.id)
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
