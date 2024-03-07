import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SECURE_MODULE_PATH } from './shared/constants/routes.constanrs';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: SECURE_MODULE_PATH,
    loadChildren: () =>
      import('./core/layout/secure/secure.module').then((m) => m.SecureModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
