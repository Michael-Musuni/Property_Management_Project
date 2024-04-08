import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillingService } from '../../billing.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-checker-dialog',
  templateUrl: './checker-dialog.component.html',
  styleUrls: ['./checker-dialog.component.sass']
})
export class CheckerDialogComponent {
  selectedPaymentMode: string;
  amountReceived: number;
  paymentModes: string[] = ['Cash'];
  invoice: any;
  loading: boolean = false;

  constructor(
    private billing: BillingService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<CheckerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invoice: any } 
  ) {
    this.invoice = data.invoice; 
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onVerify(): void {
    this.loading = true;
  
    console.log(this.data.invoice.invoiceNumber, "invoice");
    this.billing.verifyPayment(this.data.invoice.invoiceNumber).subscribe({
      next: (response) => {
        console.log('Response:', response);
        if (response.statusCode == 200) {
          this.dialogRef.close();
        }
        // Add logic to handle successful submission here, e.g., showing a success message
      },
      error: (error) => {
        console.error('Error occurred:', error);
        // Add logic to handle errors, e.g., showing an error message to the user
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  
  isValid(): boolean {
    return !!this.selectedPaymentMode && !!this.amountReceived;
  }
}
