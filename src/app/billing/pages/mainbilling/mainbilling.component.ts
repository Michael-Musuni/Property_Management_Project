import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { PropertyLookupComponent } from 'src/app/property/pages/property-lookup/property-lookup.component';
import { BillingService } from '../../billing.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-mainbilling',
  templateUrl: './mainbilling.component.html',
  styleUrls: ['./mainbilling.component.sass']
})
export class MainBillingComponent implements OnInit {
  role: any;
  selectedProperty: string; // Selected property name
  properties: string[] = ['Geofrey Burns', 'Levi Hendricks']; // List of property names
  monthLabels: string[]; // Array to hold month names for x-axis
  barGraphOptions: any; // Options for the bar graph
  invoiceData: any; // Data for paid and unpaid invoices for each month
  totalPaidAmount: number; // Total amount for paid invoices
  totalUnpaidAmount: number; // Total amount for unpaid invoices

  constructor(private billingService: BillingService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog) {
      
    this.monthLabels = ['January', 'February'];
    this.barGraphOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
    this.invoiceData = [
      { data: [], label: 'Paid' },
      { data: [], label: 'Unpaid' },
    ];
  }

  ngOnInit(): void {
    this.role = this.tokenStorageService.getUser().roles[0];
    this.selectedProperty = this.properties[0]; // Initialize with the first property
    this.updateBarGraph(this.selectedProperty);
  }

  pickProperty(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      user: '',
    };

    const dialogRef = this.dialog.open(PropertyLookupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedProperty = result.propertyName; // Update the selected property
        this.updateBarGraph(this.selectedProperty); // Update the bar graph based on the selected property
      }
    });
  }

  updateBarGraph(property: string): void {
    const propertyId = this.properties.findIndex(prop => prop === property) + 1;

    this.billingService.getInvoiceStatusPerProperty(propertyId).subscribe({
      next: (data) => {
        const monthlyPaidAmounts = data['PAID'].values; // Get the paid amounts for each month
        const monthlyUnpaidAmounts = data['NOT PAID'].values; // Get the unpaid amounts for each month

        this.monthLabels.forEach((_month, index) => {
          if (Array.isArray(data)) {
            const paidAmount = data.filter(invoice => invoice.month === index && invoice.status === 'paid')
              .reduce((acc, curr) => acc + curr.amount, 0);
            const unpaidAmount = data.filter(invoice => invoice.month === index && invoice.status === 'standing')
              .reduce((acc, curr) => acc + curr.amount, 0);

            monthlyPaidAmounts.push(paidAmount);
            monthlyUnpaidAmounts.push(unpaidAmount);
          } else if (data instanceof Object) {
            const paidAmount = (data.month === index && data.status === 'paid') ? data.amount : 0;
            const unpaidAmount = (data.month === index && data.status === 'standing') ? data.amount : 0;

            monthlyPaidAmounts.push(paidAmount);
            monthlyUnpaidAmounts.push(unpaidAmount);
          } else {
            console.error('Unexpected data type:', typeof data);
            // Handle unexpected data types here
          }
        });

        this.invoiceData = [
          { data: monthlyPaidAmounts, label: 'Total Amount for Paid Invoices' },
          { data: monthlyUnpaidAmounts, label: 'Total Amount for Unpaid Invoices' }
        ];

        this.totalPaidAmount = monthlyPaidAmounts.reduce((acc, curr) => acc + curr, 0);
        this.totalUnpaidAmount = monthlyUnpaidAmounts.reduce((acc, curr) => acc + curr, 0);
      },
      error: (error) => {
        console.error('Error fetching invoice status per property:', error);
        // Implement error handling logic
      }
    });
  }
}