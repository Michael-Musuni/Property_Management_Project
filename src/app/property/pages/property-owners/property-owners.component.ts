import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-property-owners',
  templateUrl: './property-owners.component.html',
  styleUrls: ['./property-owners.component.sass']
})
export class PropertyOwnersComponent implements OnInit {

 
  loading: Boolean
  isdata: Boolean;
  data:any
  subscription!:Subscription
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["owner_name","owner_type","property_name","phone","actions"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  constructor(

    private service: PropertyService,
    private snackbar:SnackbarService,
  ) { }

  ngOnInit(): void {
    this.getPropertyOwners()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  refresh(){
    this.getPropertyOwners()
    
  }
 

  getPropertyOwners(){
    this.loading = true
      this.service.getPropertyOwners().subscribe(
        (res) => {
          console.log(res)
          this.loading = false;
          this.data=res
          this.dataSource = new MatTableDataSource<any>(this.data.entity);
          this.dataSource.paginator = this.paginator;
        },
        (err) => {
          this.loading = false;
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );
    
  }

}
