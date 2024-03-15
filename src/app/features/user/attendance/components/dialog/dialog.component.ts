import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-late-arrival-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  reason: string | null | undefined;
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
