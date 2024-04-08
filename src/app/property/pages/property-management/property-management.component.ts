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
  displayedColumns: string[] = ["name","type","location","owner","units","status","actions"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
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
    console.log(this.router.url);
    if(this.router.url == '/property/manage') this.divcss=true

    this.role = this.tokenStorageService.getUser().roles[0]

    this.getProperties()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh(){
    this.getProperties()
  }

  getProperties() {
    this.loading = true;
    this.subscription = this.propertyService.getProperties().subscribe(
      (res) => {
        this.data= res
        console.log("Data ",this.data.entity) 
        if (this.data.length > 0) {
          this.loading = false;
          this.isdata = true;
          this.dataSource = new MatTableDataSource<any>(this.data.entity);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          
        }
        else {
          this.isdata = false;
          this.dataSource = new MatTableDataSource<Account>(this.data.entity);
        }
      },
      (err) => {
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );

  }

  viewReportOptions(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.width = '600px'
    dialogConfig.data = { test: "data" }

    const dialogRef = this.dialog.open(ReportOptionsComponent, dialogConfig);


    dialogRef.afterClosed().subscribe((result) => {
      console.log('closed');
    });
  }
}
