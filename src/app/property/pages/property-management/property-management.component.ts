import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PropertyService } from '../../services/property.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { Subscription } from 'rxjs';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Account } from 'src/app/admin/users/models/account';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReportOptionsComponent } from '../report-options/report-options.component';
import { UpdatePropertyComponent } from '../update-property/update-property.component';
import { ViewPropertyComponent } from '../view-property/view-property.component';
import { DeletePropertyComponent } from '../delete-property/delete-property.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-property-management',
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.sass']
})
export class PropertyManagementComponent implements OnInit {

  loading = false;
  isdata: Boolean;
  data:any
  role:any
  subscription!:Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["name","type","location","owner","totalUnits","vacantUnits","actions"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  isLoading: boolean;
  // dialog: any;
  constructor(
    private propertyService:PropertyService,
    private snackbar:SnackbarService,
    private tokenStorageService: TokenStorageService,
    private dialog: MatDialog,
    private router: Router

  ) { }
  divcss= false

  ngOnInit(): void {
    if(this.router.url == '/property/manage') this.divcss=true
    this.role = this.tokenStorageService.getUser().roles[0]

    this.getProperties()
  }

 
  refresh(){
    this.getProperties()
  }

  getProperties() {
    this.loading = true;
    this.subscription = this.propertyService.getProperties().subscribe(
      (res) => {
        this.data = res;
        console.log("Data ", this.data.entity);
  
        if (this.data.length > 0) {
        this.loading = false;
          this.isdata = true;
          this.dataSource = new MatTableDataSource<any>(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log("datasource", this.dataSource);
        } else {
          this.isdata = false;
          this.dataSource = new MatTableDataSource<Account>(this.data.entity);
          console.log("datasource else", this.dataSource);
        }
      },
      (err) => {
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }
  
  fetchPropertyData() {
    this.propertyService.getProperties().subscribe({
      next: (response: any) => {
        console.log('Response:', response);
        this.dataSource = new MatTableDataSource<any>(response.entity);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error occurred:', error);
        this.snackbar.showNotification("snackbar-danger", error);
      }
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updateProperty(property) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "800px";
    dialogConfig.data = {
      property,
    };

    const dialogRef = this.dialog.open(UpdatePropertyComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.snackbar.showNotification("snackbar-success", "Property updated successfully.");
        this.fetchPropertyData();
      }
    });
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
  viewProperty(property) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      property: property,
    }

    const dialogRef = this.dialog.open(ViewPropertyComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      
    })
  }
  deleteCall(property: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      property: property,
    }

    const dialogRef = this.dialog.open(DeletePropertyComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((res)=> {
      
    })
  }
}
