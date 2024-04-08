import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  [x: string]: any;
  showSnackbar(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private snackBar: MatSnackBar) { }

  showNotification(colorName, text) {
    this.snackBar.open(text, "", {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center",
      panelClass: colorName,
    });
  }
}
