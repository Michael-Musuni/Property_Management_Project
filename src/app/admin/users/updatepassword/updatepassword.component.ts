import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';
import { UseraccountsComponent } from '../useraccounts/useraccounts.component';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.sass']
})
export class UpdatepasswordComponent implements OnInit {

  updatePasswordForm: FormGroup;
  roles: any;
  departments: any;
  senior: any;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AuthService,
    private snackbar: SnackbarService,
    public dialogRef: MatDialogRef<UseraccountsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.updatePasswordForm = this.updateUserPasswordForm();
  }

  updateUserPasswordForm(): FormGroup {
    return this.fb.group({
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]],
      username: [this.data.username, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.updatePasswordForm.value.password == this.updatePasswordForm.value.confirmpassword) {

      this.loading = true;
      this.accountService.updateUserPassword({
        password: this.updatePasswordForm.value.password,
        username: this.updatePasswordForm.value.username,
      }).subscribe(
        (res) => {
          this.loading = false;
          this.snackbar.showNotification("snackbar-success", "SUCCESSFUL!");
          this.updatePasswordForm.reset();
          this.dialogRef.close();
        },
        (err) => {
          this.loading = false;
          this.snackbar.showNotification("snackbar-danger", err);
        }
      );

    } else {
      this.loading = false;
      this.snackbar.showNotification("snackbar-danger", "PASSWORDS MISMATCH!");
    }
  }

  hasSpecialCharacters(inputString: string): boolean {
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return specialCharacterRegex.test(inputString);
  }
  hasUpperCase(inputString: string): boolean {
    const hasUppercase = /[A-Z]/.test(inputString);
    return hasUppercase;
  }
  hasLowerCase(inputString: string): boolean {
    const hasLowercase = /[a-z]/.test(inputString);
    return hasLowercase;
  }
  hasNumeric(inputString: string): boolean {
    const hasNumeric = /\d/.test(inputString);
    return hasNumeric;
  }
}
