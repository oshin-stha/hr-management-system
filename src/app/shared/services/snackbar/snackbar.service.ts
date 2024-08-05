import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  openSnackBar(snackBarMessage: string) {
    this.snackbar.open(snackBarMessage, 'OK', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
