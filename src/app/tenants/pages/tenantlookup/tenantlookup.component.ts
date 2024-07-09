import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RentconfigurationsComponent } from 'src/app/property/pages/rentconfigurations/rentconfigurations.component';
import { PropertyService } from 'src/app/property/services/property.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { TenantService } from '../tenant.service';
import { TenantpaymentsComponent } from '../tenantpayments/tenantpayments.component';

@Component({
  selector: 'app-tenantlookup',
  templateUrl: './tenantlookup.component.html',
  styleUrls: ['./tenantlookup.component.sass']
})
export class TenantlookupComponent implements OnInit {
  tenants: any
  loading:Boolean
  isdata: Boolean;
  subscription!: Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['tenantName', 'tenantPhoneNumber', 'tenantIdNumber'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  constructor(
    
    public dialogRef: MatDialogRef<TenantpaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private tenantService: TenantService,
    private snackbar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getData()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  close() {
    this.dialogRef.close();
  }

  onSelectRow(data: any) {
    this.dialogRef.close({ data });
  }
  getData() {
    
    this.loading = true
    
    this.tenantService.getTenant().subscribe(res => {
      this.data = res

      this.loading = false
      if (res.entity) {
        
        this.tenants = res.entity
        this.dataSource = new MatTableDataSource<any>(this.tenants);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {
        this.loading = false
     
        this.dataSource = new MatTableDataSource<any>([]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    },err=>{
        this.loading = false
        
        this.dataSource = new MatTableDataSource<any>(this.data);
    })
  }
}