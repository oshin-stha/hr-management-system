import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingSpinnerModule } from 'src/app/shared/loading-spinner/loading-spinner.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { HeaderComponent } from './header/header.component';
import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SecureComponent, HeaderComponent, SideMenuComponent],
  imports: [
    CommonModule,
    SecureRoutingModule,
    MaterialModule,
    LoadingSpinnerModule,
    RouterModule,
  ],
})
export class SecureModule {}
