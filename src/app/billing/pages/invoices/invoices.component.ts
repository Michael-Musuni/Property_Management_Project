import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BillingService } from '../../billing.service';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewInvoiceComponent } from '../view-invoice/view-invoice.component';
import { UploadBillComponent } from '../upload-bill/upload-bill.component';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { PrintInvoiceComponent } from '../print-invoice/print-invoice.component';
import { SendOptionsDialogComponent } from '../send-options-dialog/send-options-dialog.component';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { CheckerDialogComponent } from '../checker-dialog/checker-dialog.component';
import { ReportOptionsComponent } from '../report-options/report-options.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.sass']
})
export class InvoicesComponent implements OnInit {


  selected = 'all';
  role: any
  invoices: any[] = [];
  isLoading: boolean = false;
  isDownloadSuccessful: boolean = false;
  displayedColumns: string[] = ['invoicingDate','invoiceNumber', 'status', 'totalAmount', 'tenantName', 'actions'];
  subscription: Subscription;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  downloading: boolean;
  selectedDate: Date | null = null;
  // filteredInvoices: MatTableDataSource<any>;


  constructor(private router: Router, private billingService: BillingService, private dialog: MatDialog, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.role = this.tokenStorageService.getUser().roles[0]
    this.fetchInvoices();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh() {
    this.fetchInvoices()
  }

  fetchData() {
    if (this.selected == "all") {
      this.fetchInvoices();
    }
    else if (this.selected == "paid") {
      this.getPaidInvoices();
    }
    else if (this.selected == "standing") {
      this.getStandingInvoices();
    }
    else if (this.selected == "pending") {
      this.getPendingInvoices();
    }
  }
  getTotalAmount(details: any[]): number {
    return details.reduce(function (total, detail) {
      return total + detail.chargeAmount;
    }, 0);
  }


  fetchInvoices(): void {
    this.isLoading = true;
    this.subscription = this.billingService.getAllInvoices()
      .subscribe(
        (data: any) => {
          console.log("my invoices", data);
          this.invoices = data.entity;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.invoices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching invoices:', error);
          this.isLoading = false;
        }
      );
  }
  selectTenant() {
    this.router.navigate(['/tenants/manage']);
  }
  selectUnit() {
    this.router.navigate(['/property/main']);
  }

  getPaidInvoices() {
    this.isLoading = true;
    this.subscription = this.billingService.getPaidInvoices()
      .subscribe(
        (data: any) => {
          console.log("my invoices", data);
          this.invoices = data.entity;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.invoices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching invoices:', error);
          this.isLoading = false;
        }
      );
  }

  getPendingInvoices() {
    this.dataSource = new MatTableDataSource<any>(this.invoices.filter(invoice => invoice.status === 'PENDING'));
  }
  getStandingInvoices() {
    this.isLoading = true;
    this.subscription = this.billingService.getStandingInvoices()
      .subscribe(
        (data: any) => {
          console.log("my invoices", data);
          this.invoices = data.entity;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(this.invoices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error fetching invoices:', error);
          this.isLoading = false;
        }
      );
  }

  viewInvoiceDetails(invoice: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      invoice,
    };
    const dialogRef = this.dialog.open(ViewInvoiceComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
    });
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
 
  openSendOptionsDialog(invoice: any) {
    const dialogRef = this.dialog.open(SendOptionsDialogComponent, {
      width: '300px',
      data: { invoiceNumber: invoice.invoiceNumber }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.method === 'sms') {
          this.sendInvoiceViaSMS(invoice.invoiceNumber);
        } else if (result.method === 'email') {
          this.sendInvoiceViaEmail(invoice.invoiceNumber);
        }
      }
    });
  }

  sendInvoiceViaSMS(invoiceNumber: string) {
    this.billingService.sendInvoiceViaSMS(invoiceNumber).subscribe(
      response => {
        alert('Invoice sent via SMS successfully.');
      },
      error => {
        console.error('Error sending invoice via SMS:', error);
        alert('Failed to send invoice via SMS.');
      }
    );
  }

  sendInvoiceViaEmail(invoiceNumber: string) {
    this.billingService.sendInvoiceViaEmail(invoiceNumber).subscribe(
      response => {
        alert('Invoice sent via Email successfully.');
      },
      error => {
        console.error('Error sending invoice via Email:', error);
        alert('Failed to send invoice via Email.');
      }
    );
  }
  openPaymentDialog(invoice: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      invoice,
    };

    const dialogRef = this.dialog.open(PaymentDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  handlePendingInvoice(invoice:any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      invoice,
    };

    const dialogRef = this.dialog.open(CheckerDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });

  }


  newBill() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {

    };
    const dialogRef = this.dialog.open(UploadBillComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  filterByDate(selectedDate: string | null): void {
    this.selectedDate = selectedDate ? new Date(selectedDate) : null;
    if (this.selectedDate) {
      const formattedSelectedDate = this.selectedDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const invoiceDate = new Date(data.invoicingDate);
        const formattedInvoiceDate = invoiceDate.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        });
        return formattedInvoiceDate === filter;
      };
      this.dataSource.filter = formattedSelectedDate;
    } else {
      this.dataSource.filter = ''; // Show all invoices if no date selected
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  


  viewReportOptions(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = { test: "data" }
   

    const dialogRef = this.dialog.open(ReportOptionsComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }

}
