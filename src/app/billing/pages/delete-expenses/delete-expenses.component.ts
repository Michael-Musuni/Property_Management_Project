import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { BillingService } from '../../billing.service';
import { ExpensesComponent } from '../expenses/expenses.component';
@Component({
  selector: 'app-delete-expenses',
  templateUrl: './delete-expenses.component.html',
  styleUrls: ['./delete-expenses.component.sass']
})
export class DeleteExpensesComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ExpensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private billing: BillingService) { }

  expenseName: any;
  subscription!: Subscription;
  loading = false;

  ngOnInit(): void {
    this.expenseName = this.data.row.expenseName;
  }

  onDelete() {
    // this.loading = true;
    // this.subscription = this.billing.deleteExpense(this.data.row.expenseName).subscribe(res => {
    //   this.loading = false;
    //   this.snackbar.showNotification("snackbar-success", "SUCCESSFUL!");
    //   this.dialogRef.close();
    // }, err => {
    //   this.loading = false;
    //   this.snackbar.showNotification("snackbar-danger", err);
    //   this.dialogRef.close();
    // })
  }

  onClick() {
    this.dialogRef.close();
  }

}
