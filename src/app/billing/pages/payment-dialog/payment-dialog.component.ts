import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BillingService } from '../../billing.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  payment:FormGroup;
  constructor(
    private billing: BillingService,
    private snackbar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      amountPaid: any; invoice: any 
} // Use any type for invoice
  ) {
    this.invoice = data.invoice;
    this.invoice=data.amountPaid; // Initialize the invoice object
  }
  ngOnInit(): void {
    this.payment=this.fb.group({
      amountPaid: ["", [Validators.required]],

    })
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmitClick(): void {
    this.loading = true;
  
    console.log(this.data.invoice.invoiceNumber, "invoice");
    this.billing.submitPayment(this.payment.value,this.data.invoice.invoiceNumber).subscribe({
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
