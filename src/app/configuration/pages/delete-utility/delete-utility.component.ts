import { Component, Inject, OnInit } from '@angular/core';
import { UtilitiesComponent } from '../utilities/utilities.component';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-delete-utility',
  templateUrl: './delete-utility.component.html',
  styleUrls: ['./delete-utility.component.sass']
})
export class DeleteUtilityComponent implements OnInit {
 utilityForm: FormGroup;
  isloading: boolean = false

  subscription: Subscription

  constructor(
    public dialogRef: MatDialogRef<UtilitiesComponent>,
    @Inject(MAT_DIALOG_DATA) private data :any,
    private snackbar: SnackbarService,
    private utilitiesService: UtilitiesService,
  ) { }

  ngOnInit(): void {
    this.utilityForm = this.data.utilityForm;
    console.log("this"+this.data.customer.id)
  }

  onDelete(){
   this.subscription = this.utilitiesService.deleteUtility(this.data.customer.id)
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
