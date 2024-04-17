import { Component, Inject, OnInit } from '@angular/core';
import { PropertyManagementComponent } from '../property-management/property-management.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-delete-property',
  templateUrl: './delete-property.component.html',
  styleUrls: ['./delete-property.component.sass']
})
export class DeletePropertyComponent implements OnInit {

  

  property: any
  isloading: boolean = false

  subscription: Subscription

  constructor(
    public dialogRef: MatDialogRef<PropertyManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {
    this.property = this.data.property;
  }

  onDelete(){
    console.log("Passed Id", this.property.id)
    this.subscription = this.propertyService.deleteProperty(this.property.id)
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
