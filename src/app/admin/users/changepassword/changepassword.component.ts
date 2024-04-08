import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { SnackbarService } from 'src/app/shared/snackbar.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.sass']
})
export class ChangepasswordComponent implements OnInit {


  updatePasswordForm: FormGroup;
  loading = false;
  username: any;
  password: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AuthService,
    private snackbar: SnackbarService,
    private tokenStorageService: TokenStorageService,
    public dialogRef: MatDialogRef<ChangepasswordComponent>,
  ) {

  }

  createForm() {
    this.updatePasswordForm = this.fb.group({
      password: ['', [Validators.required,Validators.minLength(12),Validators.maxLength(20)]],
      confirmpassword: ['', [Validators.required]],
      username: [this.username, [Validators.required]],
      currpassword: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().username;
    this.createForm();
  }


  onSubmit() {
    if (this.updatePasswordForm.value.password == this.updatePasswordForm.value.confirmpassword) {
      if (this.hasSpecialCharacters(this.updatePasswordForm.value.password)) {
        if (this.hasUpperCase(this.updatePasswordForm.value.password)) {
          if (this.hasLowerCase(this.updatePasswordForm.value.password)) {
            if (this.hasNumeric(this.updatePasswordForm.value.password)) {
              this.loading = true;
              this.accountService.updateUserPassword({
                password: this.updatePasswordForm.value.password,
                username: this.updatePasswordForm.value.username,
              }).subscribe(
                (res) => {
                  console.log("message ", res.message)
                  this.loading = false;

                  this.snackbar.showNotification("snackbar-success", "SUCCESSFUL!");
                  this.updatePasswordForm.reset();
                  this.tokenStorageService.signOut();
                  this.dialogRef.close();
                  // this.router.navigate(["/authentication/signin"]);
                },
                (err) => {
                  console.log("Error message ", err)

                  if (err.status === 401) {
                    // Unauthorized error handling
                    this.snackbar.showNotification("snackbar-danger", "Unauthorized access. Please log in.");
                  } else {
                    // Handle other errors
                    console.log("Error Status code ", err.status)

                    // this.snackbar.showNotification("snackbar-danger", err.message);
                  }

                  this.loading = false;

                }
              );
            } else {
              this.loading = false;
              this.snackbar.showNotification("snackbar-danger", "PASSWORDS MUST CONTAIN NUMERIC VALUES!");

            }
          } else {
            this.loading = false;
            this.snackbar.showNotification("snackbar-danger", "PASSWORDS MUST CONTAIN LOWERCASE LETTERS!");

          }
        } else {
          this.loading = false;
          this.snackbar.showNotification("snackbar-danger", "PASSWORDS MUST CONTAIN UPPERCASE LETTERS!");

        }
      } else {
        this.loading = false;
        this.snackbar.showNotification("snackbar-danger", "PASSWORDS MUST CONTAINS SPECIAL CHARACTERS!");

      }

    }
    else {
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


