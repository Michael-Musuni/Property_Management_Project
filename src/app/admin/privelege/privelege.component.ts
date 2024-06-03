import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { RolesService } from '../roles/roles.service';
import { SystemrolesComponent } from '../roles/systemroles/systemroles.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatMenuTrigger } from '@angular/material/menu';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-privelege',
  templateUrl: './privelege.component.html',
  styleUrls: ['./privelege.component.sass']
})
export class PrivelegeComponent implements OnInit {
  data:any
  addRoleForm: FormGroup;
  dataSource!: MatTableDataSource<any>;
  loading = false;
  dialogRef: any;
  privelege: string[] = [];
  displayedColumns: string[] = ['index', 'name', 'action'];
  isLoading: boolean;
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };
  constructor(
  
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service:RolesService) {}
    subscription!: Subscription;


  ngOnInit(): void {
    this.addRoleForm = this.fb.group({
      privilegeName: ["", ],
    })
    this.privilege()
  }

 

onSubmit() {
   this.loading = true;
   this.subscription = this.service.addPrivilege(this.addRoleForm.value).subscribe(res => {
     this.snackbar.showNotification("snackbar-success", "SUCCESSFUL!");
     this.loading = false;
     this.addRoleForm.reset();
    //  this.dialogRef.close();
   }, err => {
     this.loading = false;
     this.snackbar.showNotification("snackbar-danger", err);
     this.dialogRef.close();
   });
 }
 privilege() {
  this.isLoading = true

  this.subscription = this.service.getPrivilege().subscribe(res => {
    this.data = res

    console.log(this.data.message)
    this.isLoading = false;
    this.dataSource = new MatTableDataSource<any>(this.data.entity);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  })
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
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}


getData() {
    this.subscription = this.service.getPrivilege().subscribe(res => {
      this.data = res;
      // Binding with the datasource
      this.dataSource = new MatTableDataSource(this.data.entity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
}

  onClick(){
    this.dialogRef.close();
  }
}
