import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
// import { LoginComponent } from 'src/app/features/user/login/login.component';

const routes: Routes = [
  {path:'', 
  component:PublicComponent, 
  children:[
    {
      path: '',
      loadChildren:()=> import('../../../features/user/login/login.module').then((m)=>m.LoginModule)
    }
  ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule { }
