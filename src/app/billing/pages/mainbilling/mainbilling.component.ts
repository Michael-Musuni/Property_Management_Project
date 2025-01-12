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
  monthLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  barGraphOptions: any; // Options for the bar graph
  invoiceData: any; // Data for paid and unpaid invoices for each month
  totalPaidAmount: number; // Total amount for paid invoices
  totalUnpaidAmount: number; // Total amount for unpaid invoices
  propertyName: ['']
invoiceDataUnpaid: any;
invoiceDataPaid: any;

  constructor(private billingService: BillingService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog) {

    this.monthLabels = [];
    this.barGraphOptions = {
      chart: {
        type: "bar",
        height: 60,
        width: '50%', // Set width to utilize available space
        toolbar: {
          show: false ,// Hide toolbar if not needed
        },
        responsive: true,
        maintainAspectRatio: false
      },
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 200 // Specify the interval for the y-axis
          }
        }]
      }
    };
    this.invoiceData = [
      // { data: [], label: 'Paid' },
      // { data: [], label: 'Unpaid' },
    ];
    // this.invoiceData = [
    //   // { data: [], label: 'Paid' },
    //   // { data: [], label: 'Unpaid' },
    // ];
  }

  ngOnInit(): void {
    this.role = this.tokenStorageService.getUser().roles[0];
    this.selectedProperty = this.properties[0]; // Initialize with the first property
    this.updateBarGraph(this.selectedProperty, 'paid');
    this.updateBarGraph(this.selectedProperty, 'unpaid');
  }

  pickProperty(graphType: string): void {
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
        if (graphType === 'paid') {
          this.selectedProperty = result.propertyName;
          this.updateBarGraph(result.data.id, 'paid');
        } else if (graphType === 'unpaid') {
          this.selectedProperty = result.propertyName;
          this.updateBarGraph(result.data.id, 'unpaid');
        }
      }
    });
  }
  
  updateBarGraph(propertyId: any, graphType: string): void {
    this.billingService.getInvoiceStatusPerProperty(propertyId).subscribe({
      next: (data) => {
        this.monthLabels = data.PAID.labels;
  
        const monthlyPaidAmounts = data.PAID.values;
        const monthlyUnpaidAmounts = data['NOT PAID'].values;
  
        if (monthlyPaidAmounts.length > 0 && monthlyUnpaidAmounts.length > 0) {
          // Update both graphs for a property that has both paid and unpaid invoices
          this.invoiceData = [
            { data: monthlyPaidAmounts, label: 'Total Amount for Paid Invoices', backgroundColor: 'rgba(255, 99, 132, 0.5)' },
            { data: monthlyUnpaidAmounts, label: 'Total Amount for Unpaid Invoices', backgroundColor: 'rgba(54, 162, 235, 0.5)' }
          ];
          this.totalPaidAmount = monthlyPaidAmounts.reduce((acc, curr) => acc + curr, 0);
          this.totalUnpaidAmount = monthlyUnpaidAmounts.reduce((acc, curr) => acc + curr, 0);
        } else if (graphType === 'paid' && monthlyPaidAmounts.length > 0) {
          // Update data and labels for the paid invoices graph if there are paid invoices
          this.invoiceData = [{ data: monthlyPaidAmounts, label: 'Total Amount for Paid Invoices', backgroundColor: 'rgba(255, 99, 132, 0.5)' }];
          this.totalPaidAmount = monthlyPaidAmounts.reduce((acc, curr) => acc + curr, 0);
          this.totalUnpaidAmount = 0; // Reset total unpaid amount
        } else if (graphType === 'unpaid' && monthlyUnpaidAmounts.length > 0) {
          // Update data and labels for the unpaid invoices graph if there are unpaid invoices
          this.invoiceData = [{ data: monthlyUnpaidAmounts, label: 'Total Amount for Unpaid Invoices', backgroundColor: 'rgba(54, 162, 235, 0.5)' }];
          this.totalUnpaidAmount = monthlyUnpaidAmounts.reduce((acc, curr) => acc + curr, 0);
          this.totalPaidAmount = 0; // Reset total paid amount
        } else {
          // Clear the data and labels for both graphs if there are no paid or unpaid invoices
          this.invoiceData = [];
          this.totalPaidAmount = 0;
          this.totalUnpaidAmount = 0;
        }
        
      },
      error: (error) => {
        console.error('Error fetching invoice status per property:', error);
        // Implement error handling logic
      }
    });
  }
}