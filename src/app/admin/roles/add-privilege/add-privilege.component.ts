import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { RolesService } from '../roles.service';
import { SystemrolesComponent } from '../systemroles/systemroles.component';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-add-privilege',
  templateUrl: './add-privilege.component.html',
  styleUrls: ['./add-privilege.component.sass']
})
export class AddPrivilegeComponent implements OnInit {
  pri:any;
  addRoleForm: FormGroup;
  loading = false;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['index', 'name', 'action'];
  selectedEvent: any;
  selectedEvents: any[] = [];
  isLoading: boolean;
  paginator: any;
  sort: any;
  constructor( public dialogRef: MatDialogRef<SystemrolesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private service:RolesService) {}
    subscription!: Subscription;


  ngOnInit(): void {
    console.log("role ", this.data.id)
    this.privilege();
    
    
  }

 
  privilege() {
    this.isLoading = true
  
    this.subscription = this.service.getPrivilege().subscribe(res => {
      this.pri = res
  
      console.log(this.data.message)
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<any>(this.pri.entity);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }
  onSelectionChange(event: any, row: any) {
    const index = this.selectedEvents.findIndex(selectedRow => selectedRow.id === row.id);
    if (index === -1) {
     
      this.selectedEvents.push(row);
    } else {
     
      this.selectedEvents.splice(index, 1);
    }
    console.log("Selected Events:", this.selectedEvents);
  }
  onSubmit() {
    this.loading = true;
    console.log("Role Submit:", this.data, this.selectedEvents);
    this.subscription = this.service.postPrivilege(this.selectedEvents, this.data.id).subscribe(
      res => {
        this.snackbar.showNotification("snackbar-success", "SUCCESSFUL!");
        this.loading = false;
        this.dialogRef.close();
      },
      err => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", err);
        this.dialogRef.close();
      }
    );
  }

  onClick(){
    this.dialogRef.close();
  }

}
