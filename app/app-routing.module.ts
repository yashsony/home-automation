import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  {
  path : 'login' , component :LoginComponent
  },
  {
    path : 'home' , component : MenuComponent,canActivate:[AuthGuard]
  },
  {
    path : 'signup' , component :SignupComponent
    },
  {
     path: '**', component: SignupComponent 
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
