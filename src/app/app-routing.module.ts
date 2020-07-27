import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: 'dashboard',
  // canActivate:[AuthGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: '', redirectTo: 'login' ,pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
