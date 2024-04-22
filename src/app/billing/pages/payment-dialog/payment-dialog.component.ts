import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillingService } from '../../billing.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.sass']
})
export class PaymentDialogComponent {
  selectedPaymentMode: string = 'Cash'; // Initialize with a default value
  amountReceived: number;
  paymentModes: string[] = ['Cash'];
  invoice: any;
  loading: boolean = false;
  
  constructor(
    private billing: BillingService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      amountPaid: any; invoice: any 
} // Use any type for invoice
  ) {
    this.invoice = data.invoice;
    this.invoice=data.amountPaid; // Initialize the invoice object
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    this.loading = true;
  
    console.log(this.data.invoice.invoiceNumber, "invoice");
    this.billing.submitPayment(this.data.invoice.amountPaid).subscribe({
      next: (response) => {
        console.log('Response:', response);
        if (response.statusCode==200) {
          this.dialogRef.close();
          this.snackbar.open('Payment submitted successfully', 'Close', {
            duration: 3000 
          });
        }
      },
      error: (error) => {
        console.error('Error occurred:', error);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
  
  isValid(): boolean {
    return !!this.selectedPaymentMode && !!this.amountReceived;
  }
  validateInput(event: KeyboardEvent) {
    const input = event.key;
    const isNumber = /^[0-9]$/.test(input);
    if (!isNumber) {
      event.preventDefault();
    }
  }
}
