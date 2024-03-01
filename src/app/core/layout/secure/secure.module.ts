import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MaterialModules } from 'src/app/shared/material/material.module';
@NgModule({
  declarations: [
    SecureComponent,
    HeaderComponent,
    SideMenuComponent,
  ],
  imports: [CommonModule, SecureRoutingModule,MaterialModules],
})
export class SecureModule {}
