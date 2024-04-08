import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillingService } from '../../billing.service';


@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent {
  invoice: any;
  downloading: boolean;

  constructor(
    private billingService: BillingService,
    public dialogRef: MatDialogRef<ViewInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) 
  {
    this.invoice = data.invoice;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  getTotalAmount(details: any[]): number {
    return details.reduce((total, detail) => total + detail.chargeAmount, 0);
  }
  downloadInvoice(invoice: any): void {
    invoice.downloading = true; 
        const invoiceNumber = invoice.invoiceNumber;
    this.billingService.downloadInvoice(invoiceNumber).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';
      a.href = url;
      a.download = `Invoice_${invoiceNumber}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      invoice.downloading = false;        
    });
  }
}
