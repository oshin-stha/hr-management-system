import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StoreModule } from '@ngrx/store';
import { LoaderSpinnerReducer } from '../store/loader-store/reducer/loader-spinner.reducer';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';

export const Material = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSlideToggleModule,
  MatTableModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatSidenavModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSortModule,
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('loader', { LoaderState: LoaderSpinnerReducer }),
    Material,
  ],
  exports: [Material],
})
export class MaterialModule {}
