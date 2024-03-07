import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { PageContentComponent } from './page-content/page-content.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SecureComponent,
    HeaderComponent,
    FooterComponent,
    PageContentComponent,
    SideMenuComponent,
  ],
  imports: [CommonModule, RouterModule, SecureRoutingModule],
})
export class SecureModule {}
