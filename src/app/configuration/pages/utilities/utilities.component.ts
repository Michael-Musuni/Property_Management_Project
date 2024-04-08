import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddUtilitiesComponent } from '../add-utilities/add-utilities.component';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilitiesService } from '../../services/utilities.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.sass']
})
export class UtilitiesComponent implements OnInit {
  data: any
  subscription: Subscription
  isLoading: Boolean
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ["name", "description","vat", "actions"]
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  constructor(
    private utilityService: UtilitiesService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.fetchUtilities()

  }
  applyFilter(event: Event) {

  }
  refresh() {

    this.fetchUtilities()

  }
  addNew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "40%"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddUtilitiesComponent, dialogConfig)
  }
  editCall() {

  }
  deleteCall() {

  }
  fetchUtilities() {
    this.isLoading = true

    this.subscription = this.utilityService.getUtilities().subscribe(res => {
      this.data = res
      console.log(this.data)
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<any>(this.data.entity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    })
  }

}