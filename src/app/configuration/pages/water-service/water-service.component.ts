import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/core/models/role';
import { AmenitiesService } from '../../services/amenities.service';
import { AddAmenitiesComponent } from '../add-amenities/add-amenities.component';
import { DeleteAmenityComponent } from '../delete-amenity/delete-amenity.component';
import { EditAmenityComponent } from '../edit-amenity/edit-amenity.component';
import { AddWaterComponent } from '../add-water/add-water.component';

@Component({
  selector: 'app-water-service',
  templateUrl: './water-service.component.html',
  styleUrls: ['./water-service.component.sass']
})
export class WaterServiceComponent implements OnInit {
  
  data:any
  isLoading: Boolean
  subscription:Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["propertyName","name","totalAmount","actions"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  role: Role;

  constructor(
    private amenityService:AmenitiesService,   
    private dialog:MatDialog
  ) {

  }

  ngOnInit(): void {
    this.fetchAmenities()
   

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh() {
    this.fetchAmenities()

  }
  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddWaterComponent, dialogConfig)
  }
  editCall(data: any){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false
    // dialogConfig.autoFocus = true
    // dialogConfig.width = "60%"
    // dialogConfig.data = {
    //   customer: data
    // }

    // console.log("passed data", data)
    // const dialogRef=this.dialog.open(EditAmenityComponent, dialogConfig)
    // dialogRef.afterClosed().subscribe((res)=> {
    //   this.fetchAmenities()
    // })
  }
  deleteCall(data:any){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false
    // dialogConfig.autoFocus = true
    // dialogConfig.width = "40%"
    // dialogConfig.data = {
    //   customer:data
    // }
    // console.log("passed data", data)
    // const dialogRef=this.dialog.open(DeleteAmenityComponent, dialogConfig)
    // dialogRef.afterClosed().subscribe((res)=> {
      
    // })
  }
  fetchAmenities() {
    this.isLoading = true

    this.subscription = this.amenityService.getWaters().subscribe(res => {
      this.data = res

      console.log(this.data.message)
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<any>(this.data.entity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }
}