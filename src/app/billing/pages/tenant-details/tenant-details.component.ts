import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillingService } from '../../billing.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.sass']
})
export class TenantDetailsComponent implements OnInit {
  tenant: any;
  selected = 'all';
  invoices: any[] = [];
  isLoading: boolean = false;
  displayedColumns: string[] = ['invoiceNumber', 'propertyName', 'item', 'status', 'amount', 'tenantName', 'unit', 'invoiceDueDate', 'invoiceMonth', 'invoicingDate', 'actions'];
  subscription: Subscription;
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(private route: ActivatedRoute, private billingService: BillingService) { }

  ngOnInit(): void {
    // Retrieve selected tenant's details and invoices from the service
    this.fetchTenantDetails();
  }

  fetchTenantDetails() {
    const tenantId = this.route.snapshot.paramMap.get('tenantId');
    this.billingService.fetchInvoicesForTenant(tenantId).subscribe(
      (tenantDetails: any) => {
        this.tenant = tenantDetails;
        // After fetching tenant details, fetch invoices for the tenant
        this.fetchInvoicesForTenant(tenantId);
      },
      (error) => {
        console.error('Error fetching tenant details:', error);
        // Handle error, show error message, etc.
      }
    );
  }

  fetchInvoicesForTenant(tenantId: string) {
    this.isLoading = true;
    // Fetch invoices for the selected tenant
    this.billingService.fetchInvoicesForTenant(tenantId).subscribe(
      (invoices: any[]) => {
        this.invoices = invoices;
        this.dataSource = new MatTableDataSource<any>(invoices);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching invoices:', error);
        // Handle error, show error message, etc.
        this.isLoading = false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  refresh() {
    const tenantId = this.route.snapshot.paramMap.get('tenantId');
    this.fetchInvoicesForTenant(tenantId);
  }

  fetchData() {
    if (this.selected === "all") {
      const tenantId = this.route.snapshot.paramMap.get('tenantId');
      this.fetchInvoicesForTenant(tenantId);
    } else if (this.selected === "paid") {
      this.dataSource = new MatTableDataSource<any>(this.invoices.filter(invoice => invoice.status === 'paid'));
    } else if (this.selected === "standing") {
      this.dataSource = new MatTableDataSource<any>(this.invoices.filter(invoice => invoice.status !== 'paid'));
    }
  }
}
