import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/service/auth.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { UseraccountsComponent } from '../useraccounts/useraccounts.component';
import { RolesService } from '../../roles/roles.service';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrls: ['./change-role.component.sass']
})
export class ChangeRoleComponent implements OnInit {

  updateUserRoleForm: FormGroup;
  roles: any;
  senior: any;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    private accountService: AuthService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<UseraccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.updateUserRoleForm = this.updateUserDepartmentForm();
  }

  updateUserDepartmentForm(): FormGroup {
    return this.fb.group({
      role: ['', [Validators.required]],
      username: [this.data.user.username, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getRoles();
  }


  getRoles() {
    this.rolesService.getRoles().subscribe(
      (res) => {
        this.roles = res;
      },
      (err) => {
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );
  }


  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.loading = true;
    this.accountService.updateUserRole(
      this.updateUserRoleForm.value.role,this.updateUserRoleForm.value.username,
    ).subscribe(
      (res) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-success", "Successful!");
        this.updateUserRoleForm.reset();
        this.dialogRef.close();
      },
      (err) => {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", err);
      }
    );

  }

}
