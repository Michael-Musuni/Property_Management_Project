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
  properties: string[] = ['Samtech', 'Kafira', 'Unity']; // List of property names
  monthLabels: string[]; // Array to hold month names for x-axis
  barGraphOptions: any; // Options for the bar graph
  invoiceData: any; // Data for paid and unpaid invoices for each month
  totalPaidAmount: number; // Total amount for paid invoices
  totalUnpaidAmount: number; // Total amount for unpaid invoices

  constructor(private billingService: BillingService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog) {

    this.monthLabels = [];
    this.barGraphOptions = {
      chart: {
        type: "bar",
        height: 50,
        width: '80%', // Set width to utilize available space
        toolbar: {
          show: false ,// Hide toolbar if not needed
        
      responsive: true,
      maintainAspectRatio: false
        }
      }
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
        console.log(result)
      
        this.selectedProperty = result.propertyName; // Update the selected property
        this.updateBarGraph(result.data.id); // Update the bar graph based on the selected property
      }
    });
  }

  updateBarGraph(propertyId: any): void {
    // const propertyId = this.properties.findIndex(prop => prop === property) + 1
  
    this.billingService.getInvoiceStatusPerProperty(propertyId).subscribe({
      next: (data) => {
        // Initialize arrays to hold monthly paid and unpaid amounts
        this.monthLabels = data.PAID.labels
        const monthlyPaidAmounts = data.PAID.values; // Initialize with zeros for each month
        const monthlyUnpaidAmounts = data.NOTPAID.values; // Initialize with zeros for each month
  
        // Check if the 'PAID' and 'NOT PAID' properties exist in the data object
        if (data.hasOwnProperty('PAID') && data.hasOwnProperty('NOT PAID')) {
          // Iterate over each month in the 'PAID' and 'NOT PAID' properties
          for (const month in data['PAID']) {
            const monthIndex = parseInt(month) - 1; // Adjust month index since JavaScript months are zero-based
            monthlyPaidAmounts[monthIndex] = data['PAID'][month]; // Assign paid amount for the respective month
            monthlyUnpaidAmounts[monthIndex] = data['NOT PAID'][month]; // Assign unpaid amount for the respective month
          }
        } else {
          console.error('Expected properties (PAID and NOT PAID) not found in data:', data);
          // Handle the case where the expected properties are not found
        }
  
        // Update the invoice data with the calculated amounts
        this.invoiceData = [
          { data: monthlyPaidAmounts, label: 'Total Amount for Paid Invoices', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
          { data: monthlyUnpaidAmounts, label: 'Total Amount for Unpaid Invoices', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
        ];
  
        // Calculate total paid and unpaid amounts
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