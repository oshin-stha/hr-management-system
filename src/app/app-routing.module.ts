import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SECURE_MODULE_PATH } from './shared/constants/routes.constants';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found/page-not-found.component';
import { authGuard } from './core/guard/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: SECURE_MODULE_PATH,
    canMatch: [authGuard],
    loadChildren: () =>
      import('./core/layout/secure/secure.module').then((m) => m.SecureModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
