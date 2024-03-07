import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/layout/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'hrms',
    loadChildren: () =>
      import('./core/layout/secure/secure.module').then((m) => m.SecureModule),
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
